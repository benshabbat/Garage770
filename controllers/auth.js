import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  const { username, phone, email, password } = req.body;

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    // Create user
    const newUser = new User({
      username,
      email,
      phone,
      password: hashedPassword,
    });
    await newUser.save();
    // if (newUser) {
    //   res.status(201).json({
    //     _id: newUser.id,
    //     name: newUser.name,
    //     phone: newUser.phone,
    //     email: newUser.email,
    //     token: generateToken(newUser._id),
    //   });
    // }
    res.status(200).send(newUser);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });
    if (!user) return next(createError(404, "User not found!"));

    const isPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isPassword)
      return next(createError(400, "Wrong password or username!"));
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );
    const { password, isAdmin, ...otherDetails } = user._doc;
    // try {
    //   await User.findByIdAndUpdate(user._id, {
    //     $push: { token },
    //   });
    // } catch (err) {
    //   next(err);
    // }
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ ...otherDetails, token });

  } catch (error) {
    next(error);
  }
};

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT, {
    expiresIn: "30d",
  });
};

import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  const { username, phone, email, password } = req.body;

  //Check if User Exist
  const userExists = await User.findOne({ username });
  if (userExists) return next(createError(400, "User already Exists"));

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    // Create user
    const newUser = await User.create({
      username,
      email,
      phone,
      password: hashedPassword,
    });
    res.status(200).send({
      _id: newUser.id,
      name: newUser.name,
      phone: newUser.phone,
      email: newUser.email,
      // token: generateToken(newUser._id),
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      username,
    });
    if (!user) return next(createError(404, "User not found!"));

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword)
      return next(createError(400, "Wrong password or username!"));
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );
    const { isAdmin, ...otherDetails } = user._doc;
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

import User from "../models/User.js";
import bcrypt from "bcryptjs";


//test create user
export const createUser = async (req, res, next) => {
  const newUser = new User(req.body);
  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    // const user = await User.findById(req.params.id)
    
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
   
      {
        $set: {...req.body,password:hashedPassword}
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};
export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("The User has been removed");
  } catch (error) {
    next(error);
  }
};
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate("cars");
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
export const getUsersByType = async (req, res, next) => {
  const type = req.query.populate
  try {
    const users = await User.find().populate(type);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

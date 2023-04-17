import User from "../models/User.js";
import bcrypt from "bcryptjs";

const createUser = async (req) => {
  const newUser = new User(req.body);
  try {
    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    throw Error(error);
  }
};
const updateUserService = async (req) => {
  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  // const user = await User.findById(req.params.id)

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,

      {
        $set: { ...req.body, password: hashedPassword },
      },
      { new: true }
    );
    return updatedUser;
  } catch (error) {
    throw Error(error);
  }
};
const deleteUserService = async (req) => {
  try {
    return await User.findByIdAndDelete(req.params.id);
  } catch (error) {
    throw Error(error);
  }
};
const getUserService = async (req) => {
  try {
    const user = await User.findById(req.params.id).populate("cars");
    return user;
  } catch (error) {
    throw Error(error);
  }
};
const getUsersService = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw Error(error);
  }
};
const getUsersByTypeService = async (req) => {
  const type = req.query.populate;
  try {
    const users = await User.find().populate(type);
    return users;
  } catch (error) {
    throw Error(error);
  }
};

const userService = {
  createUser,
  getUsersByTypeService,
  getUsersService,
  getUserService,
  deleteUserService,
  updateUserService,
};

export default userService;

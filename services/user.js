import User from "../models/User.js";

export const getUserService = async (req) => {
  try {
    const user = await User.findById(req).populate("cars");
    return user;
  } catch (error) {
    throw Error(error);
  }
};
export const getUsersService = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw Error(error);
  }
};

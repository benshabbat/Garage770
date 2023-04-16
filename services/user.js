import User from "../models/User.js";

export const updateUser = async (req, hashedPassword) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,

      {
        $set: { ...req.body, password: hashedPassword },
      },
      { new: true }
    );
    return updatedUser;
  } catch (e) {
    // Log Errors
    throw Error("Error while Paginating Users");
  }
};

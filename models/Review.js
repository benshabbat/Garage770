import mongoose from "mongoose";
const { Schema,SchemaTypes } = mongoose;

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      unique: true,
    },
    stars: {
      type: Number,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model("User", UserSchema);
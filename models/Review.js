import mongoose from "mongoose";
const { Schema,SchemaTypes } = mongoose;

const ReviewSchema = new mongoose.Schema(
  {
    name: {
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
export default mongoose.model("Review", ReviewSchema);
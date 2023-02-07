import mongoose from "mongoose";
const { Schema, SchemaTypes } = mongoose;

const MessageSchema = new mongoose.Schema(
  {
    from: {
      type: SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    to: {
      type: SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Message", MessageSchema);
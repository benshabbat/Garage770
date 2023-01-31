import mongoose from "mongoose";
const { Schema, SchemaTypes } = mongoose;

const CarSchema = new mongoose.Schema({
  owner: {
    type: SchemaTypes.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  numberPlate: {
    type: "string",
    required: true,
    unique: true,
  },
  km: {
    type: "number",
    required: true,
  },
  brand: {
    type: "string",
    required: true,
  },
    // servise: {
    //   type: SchemaTypes.ObjectId,
    //   ref: "Servise",
    //   required: true,
    // },
});

export default mongoose.model("Car", CarSchema);
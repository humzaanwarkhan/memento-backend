import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    streak: {
      type: Number,
      default: true,
    },
    name: { type: String, default: "" },
    about: { type: String, default: "" },
    age: { type: Number, default: null },
    resetToken: String,
    resetTokenExpiry: Date,
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);

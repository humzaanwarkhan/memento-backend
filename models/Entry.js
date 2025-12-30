import mongoose from "mongoose";

const entrySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  date: {
    type: Date,
    required: true
  },
  mood: {
    type: String,
    enum: ["happy", "calm", "neutral", "tired", "anxious"],
    required: true
  },
  text: String,
  photo: String
}, { timestamps: true });

export default mongoose.model("Entry", entrySchema);

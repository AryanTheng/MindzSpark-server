import mongoose from "mongoose";

const liveUpdateSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["info", "win", "alert"],
      default: "info",
    },
  },
  { timestamps: true }
);

export default mongoose.model("LiveUpdate", liveUpdateSchema);

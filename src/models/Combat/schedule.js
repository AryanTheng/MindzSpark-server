import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
  date: String,
  game: String,
  time: String,
  venue: String,
  type: {
    type: String,
    enum: ["Indoor", "Outdoor"],
  },
  category: {
    type: String,
    enum: ["Girls", "Boys", "Girls & Boys"],
  },
});

export default mongoose.model("Schedule", scheduleSchema);

import mongoose from "mongoose";

const barGraphSchema = new mongoose.Schema({
  dept: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("BarGraph", barGraphSchema);

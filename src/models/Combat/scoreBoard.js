import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  game: String,
  girls: { type: Number, default: 0 },
  boys: { type: Number, default: 0 },
});

const scoreboardSchema = new mongoose.Schema({
  dept: {
    type: String,
    required: true,
  },
  indoor: [gameSchema],
  outdoor: [gameSchema],
  total: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Scoreboard", scoreboardSchema);

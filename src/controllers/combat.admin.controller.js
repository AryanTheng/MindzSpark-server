import LiveUpdate from "../models/Combat/liveUpdate.js";
import BarGraph from "../models/Combat/barGraph.js";
import Scoreboard from "../models/Combat/scoreBoard.js";
import Schedule from "../models/Combat/schedule.js";

/* ================= LIVE UPDATE ================= */

export const addLiveUpdate = async (req, res) => {
  try {
    const { message, type } = req.body;

    const update = await LiveUpdate.create({
      message,
      type,
    });

    res.status(201).json(update);
  } catch (error) {
    res.status(500).json({ message: "Failed to add live update" });
  }
};

/* ================= BAR GRAPH ================= */

export const updateBarGraph = async (req, res) => {
  try {
    const { dept, points } = req.body;

    const updated = await BarGraph.findOneAndUpdate(
      { dept },
      { points },
      { new: true, upsert: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update bar graph" });
  }
};

/* ================= SCOREBOARD ================= */

export const updateScoreboard = async (req, res) => {
  try {
    const { dept, indoor, outdoor, total } = req.body;

    const updated = await Scoreboard.findOneAndUpdate(
      { dept },
      { indoor, outdoor, total },
      { new: true, upsert: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update scoreboard" });
  }
};

/* ================= SCHEDULE ================= */

export const addScheduleMatch = async (req, res) => {
  try {
    const match = await Schedule.create(req.body);
    res.status(201).json(match);
  } catch (error) {
    res.status(500).json({ message: "Failed to add schedule match" });
  }
};

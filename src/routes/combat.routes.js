import express from "express";
import LiveUpdate from "../models/Combat/liveUpdate.js";
import BarGraph from "../models/Combat/barGraph.js";
import Scoreboard from "../models/Combat/scoreBoard.js";
import Schedule from "../models/Combat/schedule.js";
import { verifySuperAdmin } from "../middlewares/superadmin.middleware.js";

import {
  addLiveUpdate,
  updateBarGraph,
  updateScoreboard,
  addScheduleMatch,
} from "../controllers/combat.admin.controller.js";

const router = express.Router();

/* ================= LIVE UPDATES ================= */

router.get("/live-updates", async (req, res) => {
  try {
    const updates = await LiveUpdate.find().sort({ createdAt: -1 });
    res.json(updates);
  } catch (error) {
    res.status(500).json({ message: "Error fetching live updates" });
  }
});

/* ================= BAR GRAPH ================= */

router.get("/bargraph", async (req, res) => {
  try {
    const scores = await Scoreboard.find().sort({ total: -1 });

    const formatted = scores.map((dept) => ({
      dept: dept.dept,
      points: dept.total,
    }));

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bar graph data" });
  }
});

/* ================= SCOREBOARD ================= */

router.get("/scoreboard", async (req, res) => {
  try {
    const scores = await Scoreboard.find().sort({ total: -1 });
    res.json(scores);
  } catch (error) {
    res.status(500).json({ message: "Error fetching scoreboard" });
  }
});

/* ================= SCHEDULE ================= */

router.get("/schedule", async (req, res) => {
  try {
    const schedule = await Schedule.find().sort({ date: 1, time: 1 });
    res.json(schedule);
  } catch (error) {
    res.status(500).json({ message: "Error fetching schedule" });
  }
});

router.delete("/schedule/:id", verifySuperAdmin, async (req, res) => {
  await Schedule.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});


/* ================= ADMIN ROUTES ================= */

router.post("/superadmin/live-update", verifySuperAdmin, addLiveUpdate);
router.post("/superadmin/bargraph", verifySuperAdmin, updateBarGraph);
router.post("/superadmin/scoreboard", verifySuperAdmin, updateScoreboard);
router.post("/superadmin/schedule", verifySuperAdmin, addScheduleMatch);



export default router;

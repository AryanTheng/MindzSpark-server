import { Router } from "express"
import { superAdminLogin, createAdmin } from "../controllers/superadmin.controller.js"
import { verifySuperAdmin } from "../middlewares/superadmin.middleware.js"
import Scoreboard from "../models/Combat/scoreBoard.js";
import LiveUpdate from "../models/Combat/liveUpdate.js";
import Schedule from "../models/Combat/schedule.js";

const router = Router()

router.post("/login", superAdminLogin)

router.post("/create-admin", verifySuperAdmin, createAdmin)
router.post("/live-update/bulk", verifySuperAdmin, async (req, res) => {
  await LiveUpdate.deleteMany({});
  await LiveUpdate.insertMany(req.body);
  res.json({ message: "Live updates replaced" });
});
router.post("/schedule/bulk", verifySuperAdmin, async (req, res) => {
  await Schedule.deleteMany({});
  await Schedule.insertMany(req.body);
  res.json({ message: "Schedule updated successfully" });
});

router.post("/scoreboard/bulk", verifySuperAdmin, async (req, res) => {
  try {
    const departments = req.body;

    const calculatePoints = (games = []) => {
      return games.reduce((sum, game) => {
        const girls = Number(game.girls) || 0;
        const boys = Number(game.boys) || 0;
        return sum + girls + boys;
      }, 0);
    };

    for (let dept of departments) {

      const indoorTotal = calculatePoints(dept.indoor);
      const outdoorTotal = calculatePoints(dept.outdoor);
      const total = indoorTotal + outdoorTotal;

      await Scoreboard.findOneAndUpdate(
        { dept: dept.dept },   // 🔥 Find by department name
        {
          indoor: dept.indoor || [],
          outdoor: dept.outdoor || [],
          total: total
        },
        { upsert: true, new: true }
      );
    }

    res.json({ message: "Scoreboard updated successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Bulk update failed" });
  }
});







export default router

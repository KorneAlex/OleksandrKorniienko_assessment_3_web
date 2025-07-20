import express from "express";
import { aboutController } from "./controllers/about-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { stationsController } from "./controllers/stations-controller.js";
import { dataController } from "./controllers/data-controller.js";

export const router = express.Router();

router.get("/", (req, res) => {
  res.redirect("/dashboard");
});
router.get("/dashboard", dashboardController.index);
router.get("/about", aboutController.index);


// dahboard routes

router.post("/dashboard/submitData", dataController.addData);
router.post("/dashboard/submitStationData", stationsController.addStation);
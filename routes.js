import express from "express";
import { aboutController } from "./controllers/about-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { stationsController } from "./controllers/stations-controller.js";
import { recordsController } from "./controllers/records-controller.js";
import { testController } from "./controllers/test.js";

export const router = express.Router();

router.get("/", (req, res) => {
  res.redirect("/dashboard");
});
router.get("/dashboard", dashboardController.index);
router.get("/about", aboutController.index);


// dahboard routes

router.post("/dashboard/addStation", stationsController.addStation);

// station buttons
router.get("/stations/:station_id", recordsController.index);
router.post("/stations/:station_id/addRecord", stationsController.addRecord);

// test route
router.get("/test/:test_id", testController.test);
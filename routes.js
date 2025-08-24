import express from "express";
import { aboutController } from "./controllers/about-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { stationsController } from "./controllers/stations-controller.js";
import { recordsController } from "./controllers/records-controller.js";
import { testController } from "./controllers/test.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { adminsController } from "./controllers/admin-controller.js";

export const router = express.Router();

router.get("/", (req, res) => {
  res.redirect("/login");
});
router.get("/dashboard", dashboardController.index);
router.get("/about", aboutController.index);
router.get("/account", accountsController.account);
router.get("/admin", accountsController.account);

// acount page

router.post("/addCookieWeatherApi", accountsController.createCookieWeatherApi);
router.post("/addCookieMapApi", accountsController.createCookieMapApi);

// admin pages

router.get("/logs", adminsController.logs);

// login page

router.get("/login", accountsController.index);
router.get("/logout", accountsController.logout);
router.get("/signup", accountsController.signup);
router.post("/register", accountsController.register);
router.post("/authenticate", accountsController.authenticate);

// dahboard routes

router.post("/dashboard/addStation", stationsController.addStation);
router.post("/stations/:station_id/addRecord", recordsController.addRecord);
router.get("/stations/requestRecordsForAllStations", stationsController.getCurrentWeatherDataForAllActiveStations);


// station buttons
router.get("/stations/:station_id", stationsController.index);
router.get("/stations/:station_id/deleteStation", stationsController.deleteStation);
router.get("/stations/:station_id/deleteStationFromDB", stationsController.deleteStationFromDB);
router.get("/stations/:station_id/restoreStation", stationsController.restoreStation);
router.get("/stations/:station_id/requestData", recordsController.requestCurrentWeatherData);
router.get("/stations/editStation/:station_id/:edit", dashboardController.index);
router.post("/stations/editStation/:station_id/:edit", stationsController.editStation);

//records buttons
router.get("/stations/:station_id/:record_id/deleteRecord", recordsController.deleteRecord);
router.get("/stations/:station_id/:record_id/deleteRecordFromDB", recordsController.deleteRecordFromDB);
router.get("/stations/:station_id/:record_id/restoreRecord", recordsController.restoreRecord);
router.get("/stations/:station_id/:record_id/editRecord/:edit", stationsController.index);
router.post("/stations/:station_id/:record_id/editRecord/:edit", recordsController.editRecord);

// test route
router.get("/test", testController.test);
import { stationsStore } from "../models/stations-store.js";

export const stationsController = {
  async addStation(request, response) {
      const stationData = {
        name: request.body.name,
        city: request.body.city,
        county: request.body.county,
        latitude: request.body.latitude,
        longitude: request.body.longitude,
      };
      await stationsStore.addStationData(stationData);
      console.log("stations-controller: Station data submitted:", stationData);
      response.redirect("/dashboard");
  },

  async deleteStation(req, res) {
    await stationsStore.deleteStation(req.params.station_id);
      res.redirect("/dashboard");
  },

  async deleteStationFromDB(req, res) {
    await stationsStore.deleteStationFromDB(req.params.station_id);
      res.redirect("/dashboard");
  },

    async restoreStation(req, res) {
    await stationsStore.restoreStation(req.params.station_id);
      res.redirect("/dashboard");
  }
  }

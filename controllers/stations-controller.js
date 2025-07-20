import { stationStore } from "../models/station-store.js";

export const stationsController = {
  async addStation(request, response) {
      const stationData = {
        name: request.body.name,
        city: request.body.city,
        county: request.body.county,
        latitude: request.body.latitude,
        longitude: request.body.longitude,
      };
      await stationStore.addStationData(stationData);
      console.log("stations-controller: Station data submitted:", stationData);
      response.redirect("/dashboard");
  },
}
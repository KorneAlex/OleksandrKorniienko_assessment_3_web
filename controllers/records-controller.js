import { recordsStore } from "../models/records-store.js";
import { stationsStore } from "../models/stations-store.js";


export const recordsController = {

  async index(request, response) {
    const currentStation = await stationsStore.getStationById(request.params.station_id);
    const viewData = {
      title: "Station " + String(currentStation.name), //TODO fix this
      recordsData: await recordsStore.getRecordsDataByStationId(request.params.station_id),
      currentStation: currentStation.station,
    };
      console.log("station rendering");
      console.log("station name: ", viewData.currentStation.name);
      response.render("station", viewData);
    },

  

}
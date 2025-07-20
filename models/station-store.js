import { v4 } from "uuid";
import { format } from "date-fns";
import { initStore } from "../utils/store-utils.js";

const db = initStore("stationData");

export const stationStore = {

    async getStationData() {
        await db.read();
        return db.data.stationData;
    },

  async addStationData(station) {
    await db.read();
    station.id = v4();
    station.timestamp_created = format(new Date(), "dd/MM/yyyy' - 'HH:mm:ss");
    station.created_by = "Admin"; // TODO add admin users
    station.deleted = false;
    station.deleted_timestamp = null;
    station.deleted_by = null;
    db.data.stationData.push({ station });
    await db.write();
    console.log("stations-store: Station data saved successfully.");
    return station;
},



}
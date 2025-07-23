import { v4 } from "uuid";
import { format } from "date-fns";
import { initStore } from "../utils/store-utils.js";

const db = initStore("recordsData");

export const recordsStore = {

    async getRecordsData() {
        await db.read();
        return db.data.recordsData;
    },

  async addRecord(station_id, record) {
    await db.read();
    record.id = v4();
    record.station_id = station_id;
    record.timestamp = format(new Date(), "dd/MM/yyyy' - 'HH:mm:ss");
    db.data.recordsData.push(record ); // TODO add user id
    await db.write();
    console.log("records-store: Record data saved successfully.");
    return record;
},

  async getRecordsDataByStationId(id) {
    await db.read();
    return db.data.recordsData.filter(data => data.station_id === id);
  },

}
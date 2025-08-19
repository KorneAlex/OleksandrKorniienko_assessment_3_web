import { v4 } from "uuid";
import { format } from "date-fns";
import { initStore } from "../utils/store-utils.js";
import { usersStore } from "./user-store.js";
import { stationsStore } from "./stations-store.js";
import { timeStamp } from "console";

const db_logs = initStore("logs");
const db_rec = initStore("recordsData");
const db_del_rec = initStore("deletedRecords");

export const adminsStore = {
  async createLog(user, text1, record_id, text2, station_id, text3) {
    await db_logs.read();
    const logs = await adminsStore.getLogs();
    let lastId = 0;
    console.log("logs boolean: " + Boolean(logs));
    if(logs){
      if(logs.length>0 && (logs[logs.length-1].id)){ // here i'm making sure the next line will not brake the program even if the file is empty
      lastId = logs[logs.length-1].id;
      }
    }
    const newLog = {
        id: lastId+1,
        date: format(new Date(), "dd/MM/yyyy"),
        time: format(new Date(), "HH:mm:ss"),
        user: user,
        text1: text1,
        record_id: record_id,
        text2: text2,
        station_id: station_id,
        text3: text3,
        // description: description,
    }
    db_logs.data.logs.push(newLog);
    await db_logs.write();
    },

    async getLogs() {
      await db_logs.read();
      // console.log("logsData: " + JSON.stringify(db_logs.data.logs));
    return db_logs.data.logs;
    },
}
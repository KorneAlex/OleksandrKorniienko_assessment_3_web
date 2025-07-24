import { v4 } from "uuid";
import { format } from "date-fns";
import { initStore } from "../utils/store-utils.js";

const db_rec = initStore("recordsData");
const db_del_rec = initStore("deletedRecords");

export const recordsStore = {

    async getRecordsData() {
        await db_rec.read();
        return db_rec.data.recordsData;
    },

    async getActiveRecordsData() {
      await db_rec.read();
      const activeRecordsList = await db_rec.data.recordsData.filter((r) => r.deleted === false);
      return activeRecordsList;
    },

    async getActiveRecordsDataById(id) {
      await db_rec.read();
      const activeRecordsList = await db_rec.data.recordsData.filter((r) => r.deleted === false && r.station_id === id);
      return activeRecordsList;
    },
  
    async getDeletedRecordsData() {
      await db_rec.read();
      const deletedRecordsList = await db_rec.data.recordsData.filter((r) => r.deleted === true);
      return deletedRecordsList;
    },

    async getDeletedRecordsDataById(id) {
      await db_rec.read();
      console.log(id);
      console.log(db_rec.data.recordsData.station_id);
      const deletedRecordsList = db_rec.data.recordsData.filter((r) => r.deleted === true && r.station_id === id);
      return deletedRecordsList;
    },
    
  
    async records_exist(id) {
      const activeRecordsList = await recordsStore.getActiveRecordsDataById(id);
      if(activeRecordsList.length != 0) {
        return true;
      }
      return false;
    },

    async deleted_records_exist(id) {
      const deletedRecordsList = await recordsStore.getDeletedRecordsDataById(id);
      if(deletedRecordsList.length != 0) {
        return true;
      }
      return false;
    },

  async addRecord(station_id, record) {
    await db_rec.read();
    record.id = v4();
    record.station_id = station_id;
    record.timestamp_created = format(new Date(), "dd/MM/yyyy' - 'HH:mm:ss");
    record.created_by = "Admin"; // TODO add admin users
    record.deleted = false;
    record.deleted_timestamp = null;
    record.deleted_by = null;
    db_rec.data.recordsData.push(record ); // TODO add user id
    await db_rec.write();
    console.log("records-store: Records data saved successfully.");
    return record;
},

  async getRecordsDataByStationId(id) {
    await db_rec.read();
    return db_rec.data.recordsData.filter(data => data.station_id === id);
  },

    async deleteRecord(id) {
      await db_rec.read();
      const recordToBeDeleted = await recordsStore.getRecordById(id);
      recordToBeDeleted.deleted = true;
      recordToBeDeleted.deleted_by = "Admin"; // TODO add other admins
      recordToBeDeleted.deleted_timestamp = format(new Date(), "dd/MM/yyyy' - 'HH:mm:ss");
      console.log(`records-store: Record ${recordToBeDeleted.name} has been successfully deleted.`);
      await db_rec.write();
      return recordToBeDeleted;
    },
  
    async deleteRecordFromDB(id) {
      await db_rec.read();
      await db_del_rec.read();
      const recordToBeDeleted = await recordsStore.getRecordById(id);
      console.log(recordToBeDeleted);
      const index = await recordsStore.getRecordIndexByID(id);
      await db_rec.data.recordsData.splice(index, 1);
      console.log(`records-store: Record ${recordToBeDeleted.name} has been successfully removed from the database.`);
      recordToBeDeleted.deleted_fromDB = format(new Date(), "dd/MM/yyyy' - 'HH:mm:ss");
      db_del_rec.data.deletedRecords.push(recordToBeDeleted);
      await db_rec.write();
      await db_del_rec.write();
      return recordToBeDeleted;
    },
  
  
     async restoreRecord(id) {
      await db_rec.read();
      const recordToBeRestored = await recordsStore.getRecordById(id);
      recordToBeRestored.deleted = false;
      recordToBeRestored.deleted_by = null; // TODO maybe add restored
      recordToBeRestored.deleted_timestamp = null; // TODO maybe add restored
      console.log(`records-store: Record ${recordToBeRestored.name} has been successfully restored.`);
      await db_rec.write();
      return recordToBeRestored;
    },
  
  async getRecordById(id) {
    await db_rec.read();
    return await db_rec.data.recordsData.find(r => r.id === id);
  },
  
  async getRecordIndexByID(id) {
    await db_rec.read();
    console.log(await db_rec.data.recordsData.findIndex(r => r.id === id));
    return await db_rec.data.recordsData.findIndex(r => r.id === id);
  },

}
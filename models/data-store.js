import { v4 } from "uuid";
import { format } from "date-fns";
import { initStore } from "../utils/store-utils.js";

const db = initStore("weatherData");

export const dataStore = {

    async getWeatherData() {
        await db.read();
        return db.data.weatherData;
    },

  async saveWeatherData(record) {
    await db.read();
    record.id = v4();
    record.timestamp = format(new Date(), "dd/MM/yyyy' - 'HH:mm:ss");
    db.data.weatherData.push({ record }); // TODO add user id
    await db.write();
    console.log("data-store: Weather data saved successfully.");
    return record;
},



}
import { initStore } from "../utils/store-utils.js";

const db = initStore("weatherCodesData");

export const weatherCodeStore = {

    async getWeatherData() {
        await db.read();
        return db.data.weatherCodesData;
    }
}
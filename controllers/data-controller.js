import { dataStore } from "../models/data-store.js";

export const dataController = {
  async addData(request, response) {
      const weatherData = {
        code: request.body.code,
        temperature: request.body.temperature,
        wind_speed: request.body.wind_speed,
        wind_direction: request.body.wind_direction,
        pressure: request.body.pressure,
      };
      await dataStore.saveWeatherData(weatherData);
      console.log("data-controller: Weather data submitted:", weatherData);
      response.redirect("/dashboard");
  },
}
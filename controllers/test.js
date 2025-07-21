import { stationsStore } from "../models/stations-store.js";

export const testController = {
    async test(request, response) {
      const viewData = {
        title: "Test Page",
        message: "This is a test page.",
      };
      const data = await stationsStore.getStationIndexByID("2120c4dc-df4e-4caa-89b7-791f638a3476");
      console.log("data-controller: Test page rendered");
      console.log("test data: " + data);
      response.render("dashboard", viewData);
  }
};
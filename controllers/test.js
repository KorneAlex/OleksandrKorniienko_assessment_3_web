import { stationsStore } from "../models/stations-store.js";
import { recordsStore } from "../models/records-store.js";

export const testController = {
    async test(request, response) {
      const viewData = {
        title: "Test Page",
        message: "This is a test page.",
      };
      console.log("data-controller: Test page rendered");
      const test = await request.parameters.test_id;
      console.log(test);
      response.render("dashboard", viewData);
  }
};
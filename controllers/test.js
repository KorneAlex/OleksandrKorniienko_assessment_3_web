import { usersStore } from "../models/users-store.js";


export const testController = {
  async test(req, res) {
    const viewData = {
      title: "Test Page",
      userLoggedIn: await usersStore.userLoggedIn(req.cookies.loggedInUser),
      message: "This is a test page.",
      MAP_API_KEY: req.cookies.MAP_API_KEY,
    };
    console.log("data-controller: Test page rendered");
      // const currentData =  await stationsStore.getSummaryForTheStations();
      // const data = req.cookies.loggedInUser;
      // console.log("test data: " + JSON.stringify(currentData));
      
      res.render("test", viewData);
  }
};
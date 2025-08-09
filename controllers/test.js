import { usersStore } from "../models/user-store.js";

export const testController = {
  async test(req, res) {
    const viewData = {
      title: "Test Page",
      userLoggedIn: await usersStore.userLoggedIn(req.cookies.loggedInUser),
      message: "This is a test page.",
      MAP_API_KEY: req.cookies.MAP_API_KEY,
    };
    console.log("data-controller: Test page rendered");
      // const data = req.cookies.loggedInUser;
      console.log("test data: " + data);
      res.render("test", viewData);
  }
};
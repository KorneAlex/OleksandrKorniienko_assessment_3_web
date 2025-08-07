import { usersStore } from "../models/user-store.js";

export const testController = {
    async test(req, res) {
      const viewData = {
        title: "Test Page",
        userLoggedIn: await usersStore.userLoggedIn(req.cookies.loggedInUser),
        message: "This is a test page.",
        mapApiKey: process.env.map_api_key, // Ensure this is set in your environment variables
      };
      console.log("data-controller: Test page rendered");
      const data = await usersStore.userCheck("test@test.com", "pass");
      // console.log("test data: " + process.env.map_api_key);
      res.render("test", viewData);
  }
};
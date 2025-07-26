import { usersStore } from "../models/user-store.js";

export const testController = {
    async test(req, res) {
      const viewData = {
        title: "Test Page",
        userLoggedIn: await usersStore.userLoggedIn(req.cookies.loggedInUser),
        message: "This is a test page.",
      };
      console.log("data-controller: Test page rendered");
      const data = await usersStore.userCheck("test@test.com", "pass");
      console.log("test data: " + data);
      res.render("dashboard", viewData);
  }
};
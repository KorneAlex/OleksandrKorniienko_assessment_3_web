export const aboutController = {
  index(request, response) {
    const viewData = {
      title: "About",
      message: "This is a sample application to demonstrate the use of JS, Node.js, Express.js and Handlebars.js in a web development context.",
    };
    console.log("about rendering");
    response.render("about", viewData);
  },
};

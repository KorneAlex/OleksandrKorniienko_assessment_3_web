import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { engine } from "express-handlebars";
import { router } from "./routes.js";
import Handlebars from "handlebars";
// https://stackoverflow.com/questions/10736907/handlebars-js-else-if
// https://handlebarsjs.com/playground.html
Handlebars.registerHelper('eq', function (operand1, operand2) {
  // console.log("operand1: " + operand1 + " | " + "operant2: " + operand2);
  if(operand1 === operand2){
    return true;
  } else {
  return false;
    }
})


const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(fileUpload());
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");
app.use("/", router);

const listener = app.listen(5000, function () {
  console.log(`Server started on http://localhost:${listener.address().port}`);
});

import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { engine } from "express-handlebars";
import { router } from "./routes.js";
import Handlebars from "handlebars";

//AI helped me with this line to serve static files from the current directory for geodata.geojson
import path from "path";
import { fileURLToPath } from "url"; 

// https://stackoverflow.com/questions/10736907/handlebars-js-else-if
// https://handlebarsjs.com/playground.html
Handlebars.registerHelper('eq', function (operand1, operand2) {
  // console.log("operand1: " + operand1 + " | " + "operant2: " + operand2);
  if(operand1 === operand2){
    return true;
  } else {
  return false;
    }
});

// reverts array list for records lists
Handlebars.registerHelper('revert', function (arr) {
  let arrReverted = [];
  if(arr){
    if(Object.keys(arr).length>1){
      let j = 0;
      for(let i = Object.keys(arr).length; i>0; i--){
        arrReverted.push(arr[i-1]);
      }
      return arrReverted;
    }
      console.log("arr.lenght<1");
      return null;
    }
    console.log("!arr.lenght");
    return null;
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(fileUpload());
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");
app.use("/", router);
app.use(express.static(__dirname)); //AI helped me with this line to serve static files from the current directory for geodata.geojson

const listener = app.listen(5000, function () {
  console.log(`Server started on http://localhost:${listener.address().port}`);
});
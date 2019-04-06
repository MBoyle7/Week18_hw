const cheerio = require("cheerio");
const axios = require("axios");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const logger = require("morgan");

console.log("\n***********************************\n" +
            "Grabbing every thread name and link\n" +
            "from oann news site:" +
            "\n***********************************\n");

app.use(express.static(process.cwd() + "/public"));

const exphb = require("express-handlebars");
app.engine("handlebars", exphb({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

const port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("Listen successful on PORT " + port);
});

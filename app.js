const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
// const Data = require('./models/dataModel')

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "static")));


const viewRouter = require("./routes/viewRoute");
const apiRouter = require("./routes/apiRoute");

app.use("/", viewRouter);
app.use("/api", apiRouter);


module.exports = app;

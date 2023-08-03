const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
// const Data = require('./models/dataModel')

const app = express();

const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 1000,
    message: 'Too many requests from this ip, try again in some time',
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "static")));


const viewRouter = require("./routes/viewRoute");
const apiRouter = require("./routes/apiRoute");

app.use("/", viewRouter);
app.use("/api", apiRouter);


module.exports = app;

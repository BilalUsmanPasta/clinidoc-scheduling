const express = require("express");
const path = require("path");

const db = require("./app/models");
const morgan = require("morgan");
const cors = require("cors");
require('dotenv').config();

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false })); //Parse URL-encoded bodies
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("dev"));

app.use(cors());
app.options("*", cors());
require("./app/routes")(app);
db.sequelize.sync().then(() => {
    app.listen(process.env.PORT ||3001, () => {
        console.log("Server running on port 3001");
    });
});
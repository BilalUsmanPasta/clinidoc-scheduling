/* eslint-disable global-require, func-names */

module.exports = function (app) {
    app.use("/", require("./controllers/appointment"));
    app.use("/", require("./controllers/post"));
    app.use("/", require("./controllers/schedule"));
    app.use("/", require("./controllers/profile"));
}


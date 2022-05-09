/* eslint-disable global-require, func-names */

module.exports = function (app) {
    app.use("/", require("./controllers/schedule"));
}


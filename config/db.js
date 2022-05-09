// const config = require("./config");
// var mysql = require("mysql");
// const util = require("util");

// console.log({
//   host: config.database.host || "remotemysql.com",
//   user: config.database.user || "Ch8AIA96QJ",
//   password: config.database.password || "6qsdY8t213",
//   database: config.database.name || "Ch8AIA96QJ",
// });

// var connection = mysql.createConnection({
//   host: config.database.host || "remotemysql.com",
//   user: config.database.user || "Ch8AIA96QJ",
//   password: config.database.password || "6qsdY8t213",
//   database: config.database.name || "Ch8AIA96QJ",
// });

// connection.connect();

// connection.end();

// module.exports = connection;

const mysql = require("mysql");
const util = require("util");
const config = require("./config");

const pool = mysql.createConnection({
  host:
    config.database.host || "clinidoc.cc5lhjsgunpi.us-east-2.rds.amazonaws.com",
  user: config.database.user || "admin",
  password: config.database.password || "admin123",
  database: config.database.name || "Clinidoc",
  charset: "utf8mb4",
  connectionLimit: 100000,
  connectTimeout: 1000000000, // 10 seconds
  acquireTimeout: 1000000000, // 10 seconds
  waitForConnections: true, // Default: true
  queueLimit: 15000000000,
});

// pool.getConnection((err, connection) => {
//   if (err) {
//     if (err.code === "PROTOCOL_CONNECTION_LOST") {
//       console.error("Database connection was closed.");
//     }
//     if (err.code === "ER_CON_COUNT_ERROR") {
//       console.error("Database has too many connections.");
//     }
//     if (err.code === "ECONNREFUSED") {
//       console.error("Database connection was refused.");
//     }
//   }
//   if (connection) connection.release();
//   return;
// });

pool.query = util.promisify(pool.query);

module.exports = pool;

const pool = require("../config/db.js");

module.exports = {
  async executeQuery(query, values) {
    try {
      var results = [];
      if (values) {
        results = await pool.query(query, values);
      } else {
        results = await pool.query(query);
      }
      return results;
    } catch (e) {
      console.log(e);
      return null;
    }
  },


  asynqQuery(query, params) {
    return new Promise((resolve, reject) => {
      pool.query(query, params, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }
};

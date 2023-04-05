const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",

  host: "localhost",

  database: "qap3_fullstack_db",

  password: "Keyin2021",

  port: 5432,
});

module.exports = pool;

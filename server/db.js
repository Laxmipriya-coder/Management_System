
const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
    host: "localhost",
    port: 5432,
    database: "college_management",
    user: "postgres",
    password: "2004"
});

module.exports = pool;

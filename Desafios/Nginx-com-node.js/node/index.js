const express = require("express");

const app = express();
const port = 3000;
const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
};

const select = `SELECT name FROM people`;
const sql1 = `INSERT INTO people (name)
SELECT * FROM (SELECT 'Raphael' AS name) AS tmp
WHERE NOT EXISTS (
    SELECT name FROM people WHERE name = 'Raphael'
) LIMIT 1;`;
const sql2 = `INSERT INTO people (name)
SELECT * FROM (SELECT 'Brasil' AS name) AS tmp
WHERE NOT EXISTS (
    SELECT name FROM people WHERE name = 'Brasil'
) LIMIT 1;`;

const mysql = require("mysql");
const connection = mysql.createConnection(config);
connection.query(
  "CREATE TABLE IF NOT EXISTS people(id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL) ENGINE=InnoDB;"
);

connection.query(sql1, function (err, result) {
  if (err) throw err;
  console.log("1 record inserted");
});
connection.query(sql2, function (err, result) {
  if (err) throw err;
  console.log("1 record inserted");
});

app.get("/", (_, res) => {
  connection.query(select, function (err, result) {
    if (err) throw err;
    res.write("<h1>Full Cycle Rocks!</h1>");
    result.forEach((user) => {
      res.write(`<h3> - ${user.name}</h3>`);
    });
    res.send();
  });
});

app.listen(port, () => {
  console.log(`Rodando na porta: ${port}`);
});

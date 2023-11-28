import express, { json } from "express";
import { createConnection } from "mysql";

import cors from "cors";

let db = createConnection({
  host: "localhost",
  user: "root",
  password: "connt2db@mysql",
  database: "locators_emea",
});

let app = express();
app.use(json());
app.use(cors());

app.listen(8080, () => {
  console.log("Successfully connected to backed server");
});

/**root*/

app.get("/", (req, res) => {
  res.json("hello bro this is from backend");
});

app.post("/addLocator", (req, res) => {
  const { locatorName } = req.body;
  /**INSERT INTO my_table (id, name) VALUES (10, 'John'); */
  const q = `INSERT INTO new_id (Locator_name, MAC_FR, EL_FR, BB_FR) VALUES ("${locatorName}","","","")`;
  db.query(q, (err, data) => {
    if (err) res.json(err);
    else res.json(data);
  });
});

app.get(`/showLocator`, (req, res) => {
  const { brand, locale, locator } = req.query;
  const brand_locale = `${brand}_${locale}`;
  const q = `SELECT ${brand_locale} FROM new_id WHERE Locator_name = "${locator}"`;
  db.query(q, (err, data) => {
    if (err) res.json(err);
    else res.json(data);
  });
});

app.post("/update", (req, res) => {
  /*UPDATE new_id SET MAC_FR = "*****" WHERE Locator_name = "fname" */
  const { brand, locale, locator, updatedLocator } = req.body;
  const brand_locale = `${brand}_${locale}`;
  const q = `UPDATE new_id SET ${brand_locale} ="${updatedLocator}" WHERE Locator_name ="${locator}"`;
  db.query(q, (error, data) => {
    if (error) res.json(error);
    else res.json(data);
  });
});

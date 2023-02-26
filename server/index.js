// const { createPool } = require('mysql');

// const db = createPool({
//   host: 'localhost',
//   user: 'root',
//   password: 'connt2db@mysql',
// });

// db.query(
//   `UPDATE store.customers SET first_name="bharath" WHERE customer_id=1`,
//   (err, res) => {
//     return console.log(res);
//   }
// );

const express = require('express');
const { createConnection } = require('mysql');

const cors = require('cors');

const db = createConnection({
  host: 'localhost',
  user: 'root',
  password: 'connt2db@mysql',
  database: 'locators_emea',
});

const app = express();
app.use(express.json());
app.use(cors());

app.listen(8080, () => {
  console.log('Successfully connected to backed server');
});

/**root*/

app.get('/', (req, res) => {
  res.json('hello bro this is from backend');
});

app.post('/addLocator', (req, res) => {
  const { locatorName } = req.body;
  console.log(locatorName);
  /**INSERT INTO my_table (id, name) VALUES (10, 'John'); */
  const q = `INSERT INTO new_id (Locator_name, MAC_FR, EL_FR, BB_FR) VALUES ("${locatorName}","","","")`;
  db.query(q, (err, data) => {
    if (err) res.json(err);
    else res.json(data);
  });
});

app.get('/showLocator', (req, res) => {
  const { brand, locale, locator } = req.query;
  const brand_locale = `${brand}_${locale}`;
  const q = `SELECT ${brand_locale} FROM new_id WHERE Locator_name = "${locator}"`;
  db.query(q, (err, data) => {
    if (err) res.json(err);
    else res.json(data);
  });
});

app.post('/update', (req, res) => {
  console.log('hello');
  console.log(req.body);
  /*UPDATE new_id SET MAC_FR = "*****" WHERE Locator_name = "fname" */
  const { brand, locale, locator, updatedLocator } = req.body;
  const brand_locale = `${brand}_${locale}`;
  const q = `UPDATE new_id SET ${brand_locale} ="${updatedLocator}" WHERE Locator_name ="${locator}"`;
  db.query(q, (error, data) => {
    if (error) res.json(error);
    else res.json(data);
  });
});
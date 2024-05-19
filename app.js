const express = require('express');
const mysql = require('mysql2/promise');
const app = express();

const dbHost = process.env.DB_HOST;
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

let connection;

async function initializeDatabase() {
    console.log('Connecting to the MySQL database');
    connection = await mysql.createConnection({
    host: dbHost,
    user: dbUser,
    password: dbPassword,
    database: dbName
  });

  console.log('Connected to the MySQL database');
}

app.get('/records', async (req, res) => {
  try {
    initializeDatabase();
    const [rows] = await connection.execute('SELECT * FROM users');
    res.json(rows);
  } catch (err) {
    console.error('Error querying the database:', err);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/', async (req, res) => {
  console.log(`Welcome`);
  res.send('Welcome. I am ready.');

  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`API server listening on port ${port}`);
});

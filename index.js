const express = require('express');
const mysql = require('mysql2/promise');
const app = express();

const dbHost = process.env.DATABASE_HOST;
const dbName = process.env.DATABASE_NAME;
const dbUser = process.env.DATABASE_USER;
const dbPassword = process.env.DATABASE_PASSWORD;

let connection;

async function initializeDatabase() {
  try {
    console.log('Connecting to the MySQL database.');
    connection = await mysql.createConnection({
    host: dbHost,
    user: dbUser,
    password: dbPassword,
    database: dbName
  });
} catch (err) {
  res.send('Connecting to the MySQL database.'+err);
}

  console.log('Connected to the MySQL database');
}

app.get('/records', async (req, res) => {
  try {
    await initializeDatabase();
    const [rows] = await connection.execute('SELECT * FROM tbluser');

    // Format the results as an HTML table
    let html = '<table><tr><th>ID</th><th>Name</th></tr>';
    results.forEach((row) => {
      html += `<tr><td>${row.id}</td><td>${row.name}</td></tr>`;
    });
    html += '</table>';

    res.json(html);
  } catch (err) {
    console.error('Error querying the database:', err);
    res.status(500).send('Internal Server Error'+err);
  }
});

app.get('/', async (req, res) => {
  console.log(`Welcome`);
  res.send('Welcome. I am ready sir.' + dbHost + dbName+ dbUser+dbPassword);

  });

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`API server listening on port ${port}`);
});

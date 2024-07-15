import mysql from 'mysql';

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "social",
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});
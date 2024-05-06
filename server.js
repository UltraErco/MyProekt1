const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'chatbottests',
  password: ''
});

connection.connect((err) => {
  if (err) {
    console.error('Ошибка подключения к БД: ' + err.message);
    return;
  }
  console.log('Подключение к серверу MySQL успешно установлено');
});

app.use(bodyParser.json());

app.get('/randomItem', (req, res) => {
  connection.query('SELECT * FROM items ORDER BY RAND() LIMIT 1', (error, results) => {
    if (error) {
      console.error('Ошибка при получении случайного элемента: ' + error.message);
      res.status(500).send('Internal Server Error');
      return;
    }
    if (results.length === 0) {
      res.send('База данных пуста');
    } else {
      const randomItem = results[0];
      res.send(`(${randomItem.id}) - ${randomItem.name}: ${randomItem.description}`);
    }
  });
});

app.post('/deleteItemByID', (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.status(400).send('Bad Request');
    return;
  }
  connection.query('DELETE FROM items WHERE id = ?', [id], (error, results) => {
    if (error) {
      console.error('Ошибка при удалении элемента: ' + error.message);
      res.status(500).send('Internal Server Error');
      return;
    }
    if (results.affectedRows === 0) {
      res.send('Ошибка: Элемент с указанным ID не найден');
    } else {
      res.send('Успешно удалено');
    }
  });
});

app.post('/getItemByID', (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.status(400).send('Bad Request');
    return;
  }
  connection.query('SELECT * FROM items WHERE id = ?', [id], (error, results) => {
    if (error) {
      console.error('Ошибка при получении элемента по ID: ' + error.message);
      res.status(500).send('Internal Server Error');
      return;
    }
    if (results.length === 0) {
      res.send('Элемент с указанным ID не найден');
    } else {
      const item = results[0];
      res.send(`(${item.id}) - ${item.name}: ${item.description}`);
    }
  });
});

app.listen(port, () => {
  console.log('Сервер запущен на порту ' + port);
});

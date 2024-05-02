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

app.post('/updateItem', (req, res) => {
  const { id, name, desc } = req.body;
  if (!id || !name || !desc) {
    res.send(null);
    return;
  }
  connection.query('UPDATE items SET name = ?, description = ? WHERE id = ?', [name, desc, id], (error, results) => {
    if (error) {
      console.error('Ошибка при обновлении объекта: ' + error.message);
      res.send(null);
      return;
    }
    if (results.affectedRows === 0) {
      res.json({});
    } else {
      connection.query('SELECT * FROM items WHERE id = ?', [id], (error, updatedItem) => {
        if (error) {
          console.error('Ошибка при получении обновленного объекта: ' + error.message);
          res.send(null);
          return;
        }
        res.json(updatedItem[0]);
      });
    }
  });
});

app.get('/getAllItems', (req, res) => {
  connection.query('SELECT * FROM items', (error, results) => {
    if (error) {
      console.error('Ошибка при получении всех элементов: ' + error.message);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.json(results);
  });
});

app.post('/addItem', (req, res) => {
  const { name, desc } = req.body;
  if (!name || !desc) {
    res.status(400).send('Bad Request');
    return;
  }
  connection.query('INSERT INTO items (name, description) VALUES (?, ?)', [name, desc], (error, results) => {
    if (error) {
      console.error('Ошибка при добавлении элемента: ' + error.message);
      res.status(500).send('Internal Server Error');
      return;
    }
    const newItemId = results.insertId;
    connection.query('SELECT * FROM items WHERE id = ?', [newItemId], (error, newItem) => {
      if (error) {
        console.error('Ошибка при получении нового элемента: ' + error.message);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.json(newItem[0]);
    });
  });
});

app.post('/deleteItem', (req, res) => {
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
      res.json({});
    } else {
      res.json({ id });
    }
  });
});

app.listen(port, () => {
  console.log('Сервер запущен на порту ' + port);
});

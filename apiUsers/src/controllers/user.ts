import { Request, Response } from 'express';
import sqlite3 from 'sqlite3';

const db = new sqlite3.Database(':memory:');

// inicia tabela
db.serialize(() => {
  db.run(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      password TEXT,
      dateOfBirth TEXT,
      motherName TEXT
    )
  `);
});

export const getUsers = (req: Request, res: Response) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ users: rows });
  });
};

export const addUser = (req: Request, res: Response) => {
  const { name, password, dateOfBirth, motherName } = req.body;
  db.run(
    'INSERT INTO users (name, password, dateOfBirth, motherName) VALUES (?, ?, ?, ?)',
    [name, password, dateOfBirth, motherName],
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ user: { id: this.lastID, ...req.body } });
    }
  );
};

export const updateUser = (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, password, dateOfBirth, motherName } = req.body;
  db.run(
    'UPDATE users SET name = ?, password = ?, dateOfBirth = ?, motherName = ? WHERE id = ?',
    [name, password, dateOfBirth, motherName, id],
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ user: { id: parseInt(id, 10), ...req.body } });
    }
  );
};

export const deleteUser = (req: Request, res: Response) => {
  const { id } = req.params;
  db.run('DELETE FROM users WHERE id = ?', [id], function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ message: 'User deleted', rowsAffected: this.changes });
  });
};

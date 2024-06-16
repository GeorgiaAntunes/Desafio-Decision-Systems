"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.addUser = exports.getUsers = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
const db = new sqlite3_1.default.Database(':memory:');
// Inicialize a tabela de usuários
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
const getUsers = (req, res) => {
    db.all('SELECT * FROM users', [], (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ users: rows });
    });
};
exports.getUsers = getUsers;
const addUser = (req, res) => {
    const { name, password, dateOfBirth, motherName } = req.body;
    db.run('INSERT INTO users (name, password, dateOfBirth, motherName) VALUES (?, ?, ?, ?)', [name, password, dateOfBirth, motherName], function (err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ user: Object.assign({ id: this.lastID }, req.body) });
    });
};
exports.addUser = addUser;
const updateUser = (req, res) => {
    const { id } = req.params;
    const { name, password, dateOfBirth, motherName } = req.body;
    db.run('UPDATE users SET name = ?, password = ?, dateOfBirth = ?, motherName = ? WHERE id = ?', [name, password, dateOfBirth, motherName, id], function (err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ user: Object.assign({ id: parseInt(id, 10) }, req.body) });
    });
};
exports.updateUser = updateUser;
const deleteUser = (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM users WHERE id = ?', [id], function (err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ message: 'User deleted', rowsAffected: this.changes });
    });
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.js.map
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("library.db");

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS books (
            book_id TEXT PRIMARY KEY,
            title TEXT,
            author TEXT,
            copies INTEGER
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS members (
            member_id TEXT PRIMARY KEY,
            name TEXT
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS borrowed_books (
            member_id TEXT,
            book_id TEXT,
            PRIMARY KEY (member_id, book_id)
        )
    `);
});

module.exports = db;
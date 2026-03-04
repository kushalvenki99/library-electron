const db = require("../database/db");

async function addBook(book_id, title, author, copies = 1) {
    const [rows] = await db.execute(
        "SELECT copies FROM books WHERE book_id = ?",
        [book_id]
    );

    if (rows.length > 0) {
        await db.execute(
            "UPDATE books SET copies = copies + ? WHERE book_id = ?",
            [copies, book_id]
        );
        return "Book copies updated";
    } else {
        await db.execute(
            "INSERT INTO books VALUES (?, ?, ?, ?)",
            [book_id, title, author, copies]
        );
        return "Book added successfully";
    }
}

async function getAllBooks() {
    const [rows] = await db.execute("SELECT * FROM books");
    return rows;
}

module.exports = { addBook, getAllBooks };

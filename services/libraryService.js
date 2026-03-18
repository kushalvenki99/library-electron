const db = require("../db");

// ✅ Add Book
function addBook(book_id, title, author, copies) {
    return new Promise((resolve) => {
        db.run(
            "INSERT INTO books VALUES (?, ?, ?, ?)",
            [book_id, title, author, copies],
            function (err) {
                if (err) return resolve("Error: " + err.message);
                resolve("Book added successfully");
            }
        );
    });
}

// ✅ Get All Books
function getAllBooks() {
    return new Promise((resolve) => {
        db.all("SELECT * FROM books", [], (err, rows) => {
            if (err) return resolve([]);
            resolve(rows);
        });
    });
}

// ✅ Register Member
function registerMember(member_id, name) {
    return new Promise((resolve) => {
        db.run(
            "INSERT INTO members VALUES (?, ?)",
            [member_id, name],
            function (err) {
                if (err) return resolve("Error: " + err.message);
                resolve("Member registered successfully");
            }
        );
    });
}

// ✅ Borrow Book
function borrowBook(member_id, book_id) {
    return new Promise((resolve) => {

        db.get(
            "SELECT copies FROM books WHERE book_id = ?",
            [book_id],
            (err, book) => {

                if (!book) return resolve("Book not found");
                if (book.copies <= 0) return resolve("No copies available");

                db.run(
                    "INSERT INTO borrowed_books VALUES (?, ?)",
                    [member_id, book_id],
                    (err) => {
                        if (err) return resolve("Error: " + err.message);

                        db.run(
                            "UPDATE books SET copies = copies - 1 WHERE book_id = ?",
                            [book_id]
                        );

                        resolve("Book borrowed successfully");
                    }
                );
            }
        );
    });
}

// ✅ Return Book
function returnBook(member_id, book_id) {
    return new Promise((resolve) => {

        db.run(
            "DELETE FROM borrowed_books WHERE member_id = ? AND book_id = ?",
            [member_id, book_id],
            function () {

                db.run(
                    "UPDATE books SET copies = copies + 1 WHERE book_id = ?",
                    [book_id]
                );

                resolve("Book returned successfully");
            }
        );
    });
}

module.exports = {
    addBook,
    getAllBooks,
    registerMember,
    borrowBook,
    returnBook
};
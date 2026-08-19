const db = require("../db");


function addBook(book_id, title, author, copies) {
    return new Promise((resolve) => {
        db.run(
            "INSERT INTO books VALUES (?, ?, ?, ?)",
            [book_id, title, author, copies],
            function (err) {
                if (err) {
                    return resolve("Error: " + err.message);
                }

                resolve("Book added successfully");
            }
        );
    });
}


function getAllBooks() {
    return new Promise((resolve) => {
        db.all(
            "SELECT * FROM books",
            [],
            (err, rows) => {
                if (err) {
                    console.error("Get books error:", err);
                    return resolve([]);
                }

                resolve(rows);
            }
        );
    });
}


function registerMember(member_id, member_name) {
    return new Promise((resolve, reject) => {

        const sql = `
            INSERT INTO members (member_id, member_name)
            VALUES (?, ?)
        `;

        db.run(
            sql,
            [member_id, member_name],
            function (err) {

                if (err) {
                    console.error("Register member error:", err);
                    reject(err);
                    return;
                }

                resolve("Member registered successfully");
            }
        );
    });
}


function getMembers() {
    return new Promise((resolve, reject) => {

        db.all(
            "SELECT member_id, member_name FROM members",
            [],
            (err, rows) => {

                if (err) {
                    console.error("Get members error:", err);
                    reject(err);
                    return;
                }

                resolve(rows);
            }
        );
    });
}



function borrowBook(member_id, book_id) {
    return new Promise((resolve) => {

        db.get(
            "SELECT copies FROM books WHERE book_id = ?",
            [book_id],
            (err, book) => {

                if (err) {
                    return resolve("Error: " + err.message);
                }

                if (!book) {
                    return resolve("Book not found");
                }

                if (book.copies <= 0) {
                    return resolve("No copies available");
                }

                db.run(
                    "INSERT INTO borrowed_books VALUES (?, ?)",
                    [member_id, book_id],
                    (err) => {

                        if (err) {
                            return resolve("Error: " + err.message);
                        }

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



function returnBook(member_id, book_id) {
    return new Promise((resolve) => {

        db.run(
            "DELETE FROM borrowed_books WHERE member_id = ? AND book_id = ?",
            [member_id, book_id],
            function (err) {

                if (err) {
                    return resolve("Error: " + err.message);
                }

                if (this.changes === 0) {
                    return resolve("Borrow record not found");
                }

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
    getMembers,
    borrowBook,
    returnBook
};
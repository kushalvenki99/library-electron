async function addBook() {
    const data = {
        book_id: document.getElementById("book_id").value,
        title: document.getElementById("title").value,
        author: document.getElementById("author").value,
        copies: document.getElementById("copies").value
    };

    const result = await window.api.addBook(data);
    alert(result);
}

async function showBooks() {
    const books = await window.api.getBooks();
    const output = document.getElementById("output");

    output.innerHTML = "";

    books.forEach(book => {
        output.innerHTML += 
            `${book.book_id} | ${book.title} | ${book.author} | copies: ${book.copies}\n`;
    });
}
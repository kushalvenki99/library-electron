function goTo(page){
    window.location.href = page;
}

async function addBook(){
    const data = {
        book_id: document.getElementById("book_id").value,
        title: document.getElementById("title").value,
        author: document.getElementById("author").value,
        copies: document.getElementById("copies").value
    };

    const result = await window.api.addBook(data);
    alert(result);
}

async function registerMember(){
    const member = {
        member_id: document.getElementById("member_id").value,
        name: document.getElementById("member_name").value
    };

    const result = await window.api.registerMember(member);
    alert(result);
}

async function borrowBook(){
    const data = {
        member_id: document.getElementById("borrow_member_id").value,
        book_id: document.getElementById("borrow_book_id").value
    };

    const result = await window.api.borrowBook(data);
    alert(result);
}

async function returnBook(){
    const data = {
        member_id: document.getElementById("return_member_id").value,
        book_id: document.getElementById("return_book_id").value
    };

    const result = await window.api.returnBook(data);
    alert(result);
}

async function loadBooks(){
    const books = await window.api.getBooks();

    const table = document.getElementById("bookTable");
    if (!table) return;

    table.innerHTML = "";

    books.forEach(book => {
        const row = `
            <tr>
                <td>${book.book_id}</td>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.copies}</td>
            </tr>
        `;
        table.innerHTML += row;
    });
}

window.onload = loadBooks;


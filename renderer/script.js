function goTo(page){
    window.location.href = page;
}

async function addBook() {
    try {
        const data = {
            book_id: document.getElementById("book_id").value.trim(),
            title: document.getElementById("title").value.trim(),
            author: document.getElementById("author").value.trim(),
            copies: document.getElementById("copies").value
        };

        if (!data.book_id || !data.title || !data.author || !data.copies) {
            alert("Please fill all fields.");
            return;
        }

        const result = await window.api.addBook(data);
        alert(result);

        if (result === "Book added successfully") {
            document.getElementById("book_id").value = "";
            document.getElementById("title").value = "";
            document.getElementById("author").value = "";
            document.getElementById("copies").value = "";

            loadBooks();
        }
    } catch (error) {
        console.error("Add Book Error:", error);
        alert("Failed to add book: " + error.message);
    }
}

async function registerMember() {
    try {
        const member_id = document.getElementById("member_id").value.trim();
        const member_name = document.getElementById("member_name").value.trim();

        if (!member_id || !member_name) {
            alert("Please enter Member ID and Member Name.");
            return;
        }

        const result = await window.api.registerMember({
            member_id: member_id,
            member_name: member_name
        });

        alert(result);

        if (result === "Member registered successfully") {
            document.getElementById("member_id").value = "";
            document.getElementById("member_name").value = "";
        }

    } catch (error) {
        console.error("Register Member Error:", error);
        alert("Failed to register member: " + error.message);
    }
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

async function loadMembers() {
    try {
        const members = await window.api.getMembers();

        const table = document.getElementById("memberTable");
        table.innerHTML = "";

        members.forEach(member => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${member.member_id}</td>
                <td>${member.member_name}</td>
            `;

            table.appendChild(row);
        });

    } catch (error) {
        console.error("Error loading members:", error);
        alert("Failed to load members: " + error.message);
    }
}

window.onload = loadBooks;


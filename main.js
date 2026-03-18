const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const libraryService = require("./services/libraryService");


function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            contextIsolation: true
        }
    });

    win.loadFile("./renderer/index.html");
}

app.whenReady().then(createWindow);

// ✅ Backend APIs only
ipcMain.handle("add-book", async (event, data) => {
    return await libraryService.addBook(
        data.book_id,
        data.title,
        data.author,
        parseInt(data.copies)
    );
});

ipcMain.handle("get-books", async () => {
    return await libraryService.getAllBooks();
});

ipcMain.handle("register-member", async (event, data) => {
    return await libraryService.registerMember(
        data.member_id,
        data.name
    );
});

ipcMain.handle("borrow-book", async (event, data) => {
    return await libraryService.borrowBook(
        data.member_id,
        data.book_id
    );
});

ipcMain.handle("return-book", async (event, data) => {
    return await libraryService.returnBook(
        data.member_id,
        data.book_id
    );
});
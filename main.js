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
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const libraryService = require("./services/libraryService");


function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,

        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    win.loadFile(path.join(__dirname, "renderer", "index.html"));
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


ipcMain.handle("register-member", async (event, data) => {
    try {
        return await libraryService.registerMember(
            data.member_id,
            data.member_name
        );
    } catch (error) {
        console.error("Register Member Error:", error);
        return "Failed to register member";
    }
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

ipcMain.handle("get-members", async () => {
    try {
        return await libraryService.getMembers();
    } catch (error) {
        console.error("Get Members Error:", error);
        throw error;
    }
});
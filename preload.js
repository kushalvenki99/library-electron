const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
    addBook: (data) => ipcRenderer.invoke("add-book", data),
    getBooks: () => ipcRenderer.invoke("get-books")
});
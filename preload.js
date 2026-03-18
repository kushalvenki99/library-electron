const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {

    addBook: (data) => ipcRenderer.invoke("add-book", data),

    getBooks: () => ipcRenderer.invoke("get-books"),

    registerMember: (data) => ipcRenderer.invoke("register-member", data),

    borrowBook: (data) => ipcRenderer.invoke("borrow-book", data),

    returnBook: (data) => ipcRenderer.invoke("return-book", data)

});
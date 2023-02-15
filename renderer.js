const {
    contextBridge,
    ipcRenderer
} = require("electron");

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
    "api", {
        send: (channel, data) => {
            // whitelist channels
            let validChannels = ["toMain", "sendFileOpen", "sendDirectory", "minimize", "openFolder", "saveFile", "processImages"];
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        },
        receive: (channel, func) => {
            let validChannels = ["fromMain", "receiveFileOpen", "receiveDirectory", "processImagesReceive"];
            if (validChannels.includes(channel)) {
                // Deliberately strip event as it includes `sender` 
                ipcRenderer.on(channel, (event, ...args) => func(...args));
            }
        }
    }
);

window.addEventListener("DOMContentLoaded", () => {
    const elems = {
        add_button: document.getElementById("add"),
    };
    //alert("fiewhofew")
    elems.add_button.addEventListener("click", () => {
        console.log("few")
        alert("fiewhofew")
    })
})
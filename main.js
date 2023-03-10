const { app, BrowserWindow, ipcMain } = require('electron')
const path = require("path");
const fs = require('fs');
const electron = require('electron')

var exec = require('child_process').execFile;

let win;
let didFinishLoad = false;
require("electron-reloader")(module);
const createWindow = () => {
  win = new BrowserWindow({
    width: 900,
    height: 700,
    titleBarStyle: "hidden",
    webPreferences: {
      nodeIntegration: false,
      //contextIsolation: true,
      preload: path.join(app.getAppPath(), "renderer.js")
    }
  }) 
  win.webContents.openDevTools()
  win.loadFile('index.html')
  win.webContents.on('did-finish-load', ()=>{
    didFinishLoad = true;
    console.log("Done loading.")
  })
}

app.whenReady().then(() => {
  createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })


ipcMain.on("minimize", () => {
  win.minimize();
})

ipcMain.on("openFolder", (event, args) => {
  let directory;
  directory = electron.dialog.showOpenDialogSync(win, {
    properties: ['openDirectory']
  })
  console.log(directory)
  if (directory != null) { 
    tryReadDir(directory[0], 0)
  }
  
}) 

ipcMain.on("saveFile", (event, args) => {
  console.log("bruh")
  console.log(args)
  fs.writeFile(args.sentDirectory, args.sentData, function (err) {
    if (err) {
      console.log("unlucky")
    }
    console.log('Saved!');
  })
})

ipcMain.on("sendDirectory", (event, args) => {
  console.log(args)
  let directory = args.sentDirectory.slice(0, args.sentDirectory.length)
  let depth = args.sentDepth
  tryReadDir(directory, depth)
})

ipcMain.on("sendFileOpen", (event, args) => {
  //console.log(event) 
  //console.log(args)
  console.log("AJFIOEW")
  console.log("uh")
  console.log(args)
  if (args.includes('.')) {
    // Read cause it's a file
    tryReadFile(args)
  } else {
    // Most likely a folder
    console.log("This is not a file.")
  }
})

ipcMain.on("processImagesReceive", (event, args) => {
  let width = args.width;
  let height = args.height;
  let addrlist = args.addrlist;
  let saveaddr = args.saveaddr;
  let ext = args.ext;
  addrlist2 = []
  addrlist2.push(addrlist);
  let all_addr = addrlist2.join(";")
  let dims = width + ";" + height
  console.log("processing files")
  exec('python/dist/imger/imger.exe', [all_addr, saveaddr, ext, dims], function(err, data) {
      console.log(err);
      console.log(data.toString());
  });
})

function tryReadDir(directory, depth) {
  let files1 = []
  if (didFinishLoad) {
    try {
      files1 = fs.readdirSync(directory);
      win.webContents.send("receiveDirectory", {directory, files1, depth}) 
      console.log(files1)
    } catch (error) {
      console.error(error)
    }
  }
}

let imgs = []
imgs.push('.bmp', '.dds', '.png', '.jpg', '.tga')
// For now, central planning will be here
function tryReadFile(directory) {
  if (didFinishLoad && (!imgs.includes(directory.slice(-4)))) {
    try {
      console.log(directory)
      const data = fs.readFileSync(directory, 'utf8')
      //console.log(data)
      win.webContents.send("receiveFileOpen", {directory, data}) 
      
    } catch (error) {
      try {
        const data = fs.readFileSync(directory, 'utf8-bom')
        //console.log(data)
        win.webContents.send("receiveFileOpen", {directory, data}) 
        
      } catch (error) {
        console.error(error);
      }
      
    }
    //console.log("sent!")
    //win.webContents.send("receiveFileOpen", "Icchan ")
  }
}


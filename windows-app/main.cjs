const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("node:path");
const { getStatus, connect, disconnect } = require("./tailscale.cjs");

function createWindow() {
  const win = new BrowserWindow({
    width: 440,
    height: 650,
    minWidth: 380,
    minHeight: 560,
    title: "Hadex VPN",
    autoHideMenuBar: true,
    backgroundColor: "#101522",
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });
  win.loadFile("index.html");
}

ipcMain.handle("vpn:status", async () => getStatus());
ipcMain.handle("vpn:connect", async (_event, ip) => connect(ip));
ipcMain.handle("vpn:disconnect", async () => disconnect());

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("hadexVpn", {
  getStatus: () => ipcRenderer.invoke("vpn:status"),
  connect: (ip) => ipcRenderer.invoke("vpn:connect", ip),
  disconnect: () => ipcRenderer.invoke("vpn:disconnect")
});

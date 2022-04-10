import { contextBridge, ipcRenderer } from "electron";

export const api = {
  /** pin the window or not */
  switchPin: (isPinned: boolean) => {
    ipcRenderer.send("switchPin", isPinned);
  },
};

contextBridge.exposeInMainWorld("Main", api);

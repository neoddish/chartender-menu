import { contextBridge } from "electron";

export const api = {};

contextBridge.exposeInMainWorld("Main", api);

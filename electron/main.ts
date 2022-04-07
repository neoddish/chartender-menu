import * as path from "path";
import { app } from "electron";
import { menubar } from "menubar";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

const isDev = process.env.NODE_ENV === "development";

const assetsPath =
  process.env.NODE_ENV === "production"
    ? path.join(process.resourcesPath, "assets")
    : path.join(app.getAppPath(), "assets");

function createMenubarApp() {
  const APP_WIDTH = 600;
  const APP_HEIGHT = 500;

  const menuBar = menubar({
    icon: path.join(assetsPath, "/ChartenderMenuIcon.png").toString(),
    index: MAIN_WINDOW_WEBPACK_ENTRY,
    preloadWindow: true,
    browserWindow: {
      skipTaskbar: true,
      show: false,
      height: APP_HEIGHT,
      width: APP_WIDTH,
      frame: false,
      resizable: isDev,
      movable: false,
      fullscreenable: false,
      minimizable: false,
      alwaysOnTop: true,
      webPreferences: {
        devTools: isDev,
        preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      },
      hasShadow: true,
    },
  });

  menuBar.on("ready", () => {
    if (!menuBar.window) return;

    app.dock.hide();

    menuBar.window.setMenu(null);
  });

  menuBar.on("show", () => {
    if (!menuBar.window) return;

    if (isDev) menuBar.window.webContents.openDevTools();
  });

  menuBar.on("focus-lost", () => {
    if (!isDev) {
      menuBar.hideWindow();
    }
  });
}

app.on("ready", createMenubarApp);

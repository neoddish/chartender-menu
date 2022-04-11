<img src="https://github.com/neoddish/chartender-menu/blob/main/src/assets/textlogo.svg" height="100" />

# chartender-menu

chartender on menubar - a widget generates charts for you.

<p align="center">
  <img  src="https://gw.alipayobjects.com/zos/antfincdn/qg3KaF7my/chartendermenu-demo.gif" alt="screenshot" height="500" />
</p>

Paste the data into the data view and Chartender-Menu will automatically recommand charts for you. You can modify the configuration of the chart or export the chart as an image or code snippet.

## Download

For MacOS: 

* [Download latest here](https://github.com/neoddish/chartender-menu/releases/latest)
* Allow this app in *System Preferences > Securtiy & Privacy > General*

For Windows and Linux:

* Clone this repository
* Run `npm install`
* Run `npm run package`
* Find your executable in `<project>/out/`

> Notice that I develop this app on MacOS, so there might be bugs on Windows/Linux. PRs welcome!

## Develop

### Debugging

```bash
npm install
npm start
```

### Packing

```bash
npm run package
```

Find your executable in `<project>/out/`.

## Powered by

* [AVA](https://github.com/antvis/AVA) - A framework for automated visual analytics.
* [G2Plot](https://github.com/antvis/G2Plot) - An interactive and responsive charting library.
* [menubar](https://github.com/maxogden/menubar) - High level way to create menubar desktop applications with Electron.

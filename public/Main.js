const { app, BrowserWindow, Menu } = require('electron')
let server = require('./server')

const path = require('path')
const url = require('url')
const isDev = require('electron-is-dev')

let mainWindow

const createWindow = () => {
	mainWindow = new BrowserWindow({ show: false, fullscreen: true })
	mainWindow.loadURL(isDev ? 'http://localhost:3000/' : `file://${path.join(__dirname, '..build/index.html')}`)


	mainWindow.setMenu(null)

	//set new Menu
	const template = [
		{
			label: 'File',
			role: 'window',
			submenu: [
				{ role: 'close' }
			]
		},
		{
			label: 'Window',
			submenu: [
				{ role: 'reload' },
				{ role: 'forcereload' },
				{ role: 'toggledevtools' },
			]
		},
	]

	const menu = Menu.buildFromTemplate(template)
	Menu.setApplicationMenu(menu)
	
	// mainWindow.webContents.openDevTools()
	mainWindow.on('closed', () => mainWindow = null)
	mainWindow.on('ready-to-show', function() { 
		mainWindow.show(); 
		mainWindow.focus(); 
	});
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
	process.platform !== 'darwin' && app.quit()
})

app.on('activate', () => {
	mainWindow === null && createWindow()
})

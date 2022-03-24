// app.js
const Koa = require('koa')
const koaBody = require('koa-body')
require('dotenv').config();
const logger = require('./clases/utils/Logger.js');

global.admin = true;
global.DBdefault = process.env.DBdefault;

const {inicializarTablas} = require('./config.js');
(async() => {
    await inicializarTablas(DBdefault);
})();

const app = new Koa()

// Set up body parsing middleware
app.use(koaBody())

const products = require('./api/productosApi.js')
app.use(products.routes())

const index = require('./view_index.js')
app.use(index.routes())

const books = require('./books.js')
app.use(books.routes())

// Server listen
const PORT = 8080
const server = app.listen(PORT, () => {
  console.log(`Servidor Koa escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log('Error en Servidor Koa:', error))

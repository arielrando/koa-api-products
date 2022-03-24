// books.js
const Router = require('koa-router')

// Prefix all routes with /books
const router = new Router({
  prefix: '/',
})

const logger = require('./clases/utils/Logger.js');

router.get('/', async (ctx, next) => {
    ctx.body = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
        <script src="https://kit.fontawesome.com/57369bf136.js" crossorigin="anonymous"></script>
        <title>API</title>
    </head>
    <body>
        <h1>Rutas para las APIs</h1>
        <h2>Productos - /api/productos</h2>
        <ul>
            <li><h4>GET '/api/productos' -> devuelve todos los productos.</h4></li>
            <li><h4>GET '/api/productos/:id' -> devuelve un producto según su id.</h4></li>
            <li><h4>POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado (SOLO ADMIN).</h4>
            <p>cuerpo del body a enviar: { "codigo":"test","nombre":"test","precio":100,"foto":"url","stock":500}</p></li>
            <li><h4>PUT '/api/productos/:id' -> recibe y actualiza un producto según su id (SOLO ADMIN).</h4>
            <p>cuerpo del body a enviar: { "codigo":"test","nombre":"test cambiado","precio":100,"foto":"url","stock":500}</p></li>
            <li><h4>DELETE '/api/productos/:id' -> elimina un producto según su id (SOLO ADMIN).</h4></li>
        </ul>
        </body>
    </html>
    `
  })

module.exports = router;
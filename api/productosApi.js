// books.js
const Router = require('koa-router')

// Prefix all routes with /books
const router = new Router({
  prefix: '/productosApi',
})

const producto = require('../clases/models/Products.js');
const prod = new producto();
const logger = require('../clases/utils/Logger.js');

router.get('/', async (ctx, next) => {
        let todos = await prod.getAll();
        if(todos.length>0){
            ctx.body = todos
        }else{
            ctx.body = {mensajeError:"No hay productos"}
        }
  })

router.get('/:id', async (ctx, next) => {
    let buscado = await prod.getById(ctx.params.id);
    if(buscado){
        ctx.body = buscado;
    }else{
        ctx.body = {mensajeError:"No exite dicho producto"};
    }
})

router.post('/', async (ctx, next) => {
    if(admin){
        let nuevo = await prod.save(ctx.request.body);
        if(nuevo){
            ctx.body = {mensajeExito:"Producto creado",itemNuevo:`${nuevo}`};
        }else{
            logger.error("productosApi: No se creo el producto");
            ctx.body = {mensajeError:"No se creo el producto"};
        }
    }else{
        logger.error("productosApi: ruta / método POST no autorizada");
        ctx.body ={ error : -1, mensajeError: Buffer.from("ruta / método POST no autorizada", 'utf-8').toString };
    }
})

router.put('/:id', async (ctx, next) => {
    if(admin){
        let buscado = await prod.editById(ctx.params.id,ctx.request.body);
        if(buscado){
            ctx.body = buscado;
        }else{
            ctx.body = {mensajeError: "No exite dicho producto"};
        }
    }else{
        logger.error("productosApi: ruta /id método PUT no autorizada");
        ctx.body =  { error : -1, mensajeError: Buffer.from("ruta /id método PUT no autorizada", 'utf-8').toString};
    }
})

router.delete('/:id', async (ctx, next) => {
    if(admin){
        let buscado = await prod.getById(ctx.params.id);
        if(buscado){
            let result = await prod.deleteById(ctx.params.id);
            if(result){
                ctx.body = {mensajeExito:"Producto borrado"};
            }else{
                logger.error("productosApi: El producto no se pudo borrar");
                ctx.body = {mensajeError:"El producto no se pudo borrar"};
            }
        }else{
            ctx.body = {mensajeError:"El producto que quiere borrar no existe"};
        }
    }else{
        logger.error("productosApi: ruta /id método DELETE no autorizada");
        ctx.body = { error : -1, mensajeError: Buffer.from("ruta /id método DELETE no autorizada", 'utf-8').toString};
    }
})

module.exports = router;
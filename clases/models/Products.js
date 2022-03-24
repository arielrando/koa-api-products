require('dotenv').config();
const generalDao = require('../daos/generalDao.js');
const fetch = require('node-fetch');

module.exports = class Productos extends generalDao {
    constructor(){
        switch (DBdefault) {
            case 'archivoTexto':
                super('./DB/productos.txt');
            break;
            case 'mysql':
                super('productos');
            break;
            case 'mongoDB':
                let esquema = {
                    codigo: {type: String, required: true},
                    nombre: {type: String, required: true},
                    fechaCreacion: {type: Date, default: Date.now},
                    fechaModificacion: {type: Date, default: Date.now},
                    descripcion: {type: String},
                    foto: {type: String, required: true},
                    stock: {type: Number, default:0},
                    precio: {type: Number, required: true}

                };
                super('productos',esquema)
            break;
            case 'firebase':
                super('productos');
            break;
            case 'sqlite3':
                super('productos');
            break;
            default:
                super('./DB/productos.txt');
            break;
        }
        
    }

    async getAllCustom(){
        let todos = await this.getAll();
        for(let i=0; i<todos.length; i++) {
            try {
                let response = await fetch(todos[i].foto, {
                    method: 'HEAD'
                });
                if(!response.ok){
                    todos[i].foto = 'noExiste.jpg'
                }
            } catch (error) {
                todos[i].foto = 'noExiste.jpg'
            }
            
        }
        return todos;
    }
}
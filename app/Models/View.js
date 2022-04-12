'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class View extends Model {
    static get store(){
        return ['name', 'icono', 'nivel', 'opciones', 'status', 'ruta', 'categoria_id']
        }
    
        static get table () {
        return 'vistas';
        };
    
        static get primaryKey () {
        return 'id';
        };
    
    
        static get hidden () {
        return ['created_at', 'updated_at'];
        };
        
    
        //RELACIONES
        Categoria() {
        return this.belongsTo('App/Models/Categoria', 'categoria_id', 'id');
        };
    
        Rols () {
            return this.belongsToMany('App/Models/Rol', 'vista_id', 'rol_id', 'id', 'id')
            .pivotTable('rol_vistas')
        }
}

module.exports = View

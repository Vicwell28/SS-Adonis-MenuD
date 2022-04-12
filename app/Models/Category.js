'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Category extends Model {
    static get store(){
        return ['name', 'icono', 'nivel', 'opciones', 'status']
        }
    
    
        static get table () {
        return 'categorias';
        };
    
    
        static get primaryKey () {
        return 'id';
        };
    
    
        static get hidden () {
        return ['created_at', 'updated_at'];
        };
        
        Vista() {
        return this.hasMany('App/Models/Vista', 'id', 'categoria_id');
        };
}

module.exports = Category

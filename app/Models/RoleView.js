'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class RoleView extends Model {
    static get store(){
        return ['rol_id', 'vista_id']
        }
    
    
        static get table () {
        return 'rol_vistas';
        };
    
    
        static get primaryKey () {
        return 'id';
        };
    
    
        static get hidden () {
        return ['created_at', 'updated_at'];
        };
        
        Vista() {
        return this.belongsTo('App/Models/Rol', 'rol_id', 'id');
        };
}

module.exports = RoleView

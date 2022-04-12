'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class RoleView extends Model {
    static get store(){
        return ['role_id', 'view_id']
        }
    
    
        static get table () {
        return 'role_views';
        };
    
    
        static get primaryKey () {
        return 'id';
        };
    
    
        static get hidden () {
        return ['created_at', 'updated_at'];
        };
        
        View() {
        return this.belongsTo('App/Models/Role', 'role_id', 'id');
        };
}

module.exports = RoleView

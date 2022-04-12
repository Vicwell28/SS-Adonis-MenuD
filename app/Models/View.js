'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class View extends Model {
    static get store(){
        return ['name', 'icon', 'level', 'status', 'route', 'category_id']
        }
    
        static get table () {
        return 'views';
        };
    
        static get primaryKey () {
        return 'id';
        };
    
    
        static get hidden () {
        return ['created_at', 'updated_at'];
        };
        
    
        //RELACIONES
        Category() {
        return this.belongsTo('App/Models/Category', 'category_id', 'id');
        };
    
        Roles () {
            return this.belongsToMany('App/Models/Role', 'view_id', 'role_id', 'id', 'id')
            .pivotTable('role_views')
        }
}

module.exports = View

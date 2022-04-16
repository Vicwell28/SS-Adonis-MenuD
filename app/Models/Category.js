'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Category extends Model {
    static get store(){
        return ['name', 'icon', 'level', 'status']
        }
    
    
        static get table () {
        return 'categories';
        };
    
    
        static get primaryKey () {
        return 'id';
        };
    
    
        static get hidden () {
        return ['created_at', 'updated_at'];
        };
        
        View() {
        return this.hasMany('App/Models/View', 'id', 'category_id');
        };
}

module.exports = Category

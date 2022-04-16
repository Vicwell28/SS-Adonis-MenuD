'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Role extends Model {
    static get store(){
        return ['name']
    }

    static get table () {
    return 'roles'
  }

  static get primaryKey () {
    return 'id'
  }

    static get hidden () {
        return ['created_at', 'updated_at']
    }

    //RELACIONES

    Users() {
      return this.hasMany('App/Models/User', 'id', 'role_id')
    }

    View() {
      return this.belongsToMany('App/Models/View', 'role_id', 'view_id', 'id', 'id')
      .pivotTable('role_views')
  }
}

module.exports = Role

'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Role extends Model {
    static get store(){
        return ['name']
    }

    static get table () {
    return 'rols'
  }

  static get primaryKey () {
    return 'id'
  }

    static get hidden () {
        return ['created_at', 'updated_at']
    }

    //RELACIONES

    User() {
        return this.hasMany('App/Models/User', 'id', 'rol_id')
    }

    Vista() {
      return this.belongsToMany('App/Models/Vista', 'rol_id', 'vista_id', 'id', 'id')
      .pivotTable('rol_vistas')
  }
}

module.exports = Role

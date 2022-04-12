'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RoleViewSchema extends Schema {
  up () {
    this.create('role_views', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('role_views')
  }
}

module.exports = RoleViewSchema

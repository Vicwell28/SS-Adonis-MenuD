'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ViewSchema extends Schema {
  up () {
    this.create('views', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('views')
  }
}

module.exports = ViewSchema

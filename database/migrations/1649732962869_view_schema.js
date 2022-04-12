'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ViewSchema extends Schema {
  up () {
    this.create('views', (table) => {
      table.increments()
      table.string('name', 50).notNullable()
      table.string('level').nullable()
      table.string('route').nullable()
      table.string('icon').nullable()
      table.integer('category_id').unsigned().references('id').inTable('categories')
      table.boolean('status').defaultTo(1)
      table.timestamps()
    })
  }

  down () {
    this.drop('views')
  }
}

module.exports = ViewSchema

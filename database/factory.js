'use strict'


/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Hash = use('Hash')

Factory.blueprint('App/Models/User', async (data) => {
    return {
      username: data.username,
      email: data.email,
      password: data.password,
    }
  })

Factory.blueprint('App/Models/Role', async (faker, i, data) => {
    return {
        name : data.name
    }
  })

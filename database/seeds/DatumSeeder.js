'use strict'

/*
|--------------------------------------------------------------------------
| DatumSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class DatumSeeder {
  async run () {
    const deb = await Factory
    .model('App/Models/Role')
    .create({id : 1, name : 'debugger'});

    const sop = await Factory
    .model('App/Models/Role')
    .create({name : 'soporte'})

    const adm = await Factory
    .model('App/Models/Role')
    .create({name : 'administración'})

    await Factory
    .model('App/Models/Role')
    .create({name : 'invitado'})

    // const administrador = await Factory
    // .model('App/Models/User')
    // .create({ username: 'Igmar', email : 'igmar@admin.com', password : '123456789'  });

    // const soporte = await Factory
    // .model('App/Models/User')
    // .create({ username: 'Marilu', email : 'marilu@soporte.com', password : '123456789'  });

    // const u_debbuger = await Factory
    // .model('App/Models/User')
    // .create({ username: 'Victor', email : 'victor@debugger.com', password : '123456789'  });

    // await deb.User().save(administrador)
    // await sop.User().save(soporte)
    // await adm.User().save(u_debbuger)
    
  }
}

module.exports = DatumSeeder

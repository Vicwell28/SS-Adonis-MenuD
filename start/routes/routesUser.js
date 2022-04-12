'use strict'
/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('user/ruta', () => {return { greeting: 'Funciona rutas User' }
}).prefix('api/v1')


Route.group(() => {
    Route.resource('user', 'UserController')
    .apiOnly()
})
.prefix('api/v1')
.namespace('User')
.middleware(['auth'])
  

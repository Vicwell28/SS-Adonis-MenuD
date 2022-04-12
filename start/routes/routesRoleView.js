'use strict'
/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('rol/vista/ruta', () => {return { greeting: 'Funciona rutas Rol' }
}).prefix('api/v1')


Route.group(() => {
    Route.resource('rol/vista', 'RolVistaController')
    .apiOnly()
})
.prefix('api/v1')
.namespace('View')
.middleware(['auth'])
  
  
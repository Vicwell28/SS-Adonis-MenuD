'use strict'
/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('rol/routes', () => {return { greeting: 'Funciona rutas Rol' }
}).prefix('api/v1')


Route.group(() => {
    Route.resource('role', 'RoleController')
    .apiOnly().
    validator(new Map([
      [['role.store'], ['role/StoreRole']]
    ])); 

    Route.post('role/assign/view', 'RoleController.assignView')
})
.prefix('api/v1')
.namespace('User')
.middleware(['auth'])
  
  
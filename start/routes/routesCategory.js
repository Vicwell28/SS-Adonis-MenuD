'use strict'
/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')


Route.get('categoria/ruta', () => {return { greeting: 'Funciona rutas Categorias' }
}).prefix('api/v1')


Route.group(() => {
    Route.resource('categoria', 'CategoriaController')
    .apiOnly()
    .validator(new Map([
      [['categoria.store'], ['view/StoreCategoria']]
    ]))
})
.prefix('api/v1')
.namespace('View')
.middleware(['auth'])
  

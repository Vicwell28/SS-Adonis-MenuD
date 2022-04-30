'use strict'
/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('category/ruta', () => {return { greeting: 'Funciona rutas Categorias' }
}).prefix('api/v1')


Route.group(() => {
    Route.resource('category', 'CategoryController')
    .apiOnly()
    .validator(new Map([
      [['category.store'], ['view/StoreCategory']]
    ]))

    Route.get("get/category/role", 'CategoryController.getCategoryByRole')
})
.prefix('api/v1')
.namespace('View')
.middleware(['auth'])

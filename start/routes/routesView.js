'use strict'
/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('vista/ruta', () => {return { greeting: 'Funciona rutas Vista' }
}).prefix('api/v1')

Route.group(() => {
    Route.resource('view', 'ViewController')
    .apiOnly()})
.prefix('api/v1')
.namespace('View')
.middleware(['auth'])
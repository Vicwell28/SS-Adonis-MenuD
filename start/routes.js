'use strict'
/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})


Route.get('auth/route', () => {return { greeting: 'Funciona rutas Auth' }
}).prefix('api/v1')


Route.group(() => {
    console.log("Entra En la ruta"); 
    Route.post('login', 'UserController.login'); 
    Route.post('logout', 'UserController.logout').middleware(['auth']);
    Route.post('register', 'UserController.signIn');
})
.prefix('api/v1')


Route.group(() => {
    Route.resource('user', 'UserController')
    .apiOnly()
  })
.prefix('api/v1')  
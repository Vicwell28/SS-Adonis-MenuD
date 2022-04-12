'use strict'
/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */

const Route = use('Route')

Route.get('auth/route', () => {return { greeting: 'Funciona rutas Auth' }
}).prefix('api/v1')


Route.group(() => {
    Route.post('login', 'AuthController.login'); 
    Route.post('logout', 'AuthController.logout').middleware(['auth']);
    Route.post('sign-in', 'AuthController.signIn');
})
.prefix('api/v1')
.namespace('Auth')
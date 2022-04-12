'use strict'
/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */

const Route = use('Route')

Route.get('auth/route', () => {return { greeting: 'Funciona rutas Auth' }
}).prefix('api/v1')


Route.group(() => {
    Route.post('login', 'AuthController.login').validator('auth/LoginAuth'); 
    Route.post('logout', 'AuthController.logout').middleware(['auth']);
    Route.post('register', 'AuthController.signIn').validator('auth/SignInAuth');
})
.prefix('api/v1')
.namespace('Auth')
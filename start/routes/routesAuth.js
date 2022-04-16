'use strict'
/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */

const Route = use('Route')

Route.get('auth/route', () => {return { greeting: 'Funciona rutas Auth' }
}).prefix('api/v1')


Route.group(() => {
    console.log("Entra En la ruta"); 
    Route.post('login', 'AuthController.login').validator('auth/LoginAuth'); 
    Route.post('logout', 'AuthController.logout').middleware(['auth']);
    Route.post('sign-in', 'AuthController.signIn').validator('auth/SigninAuth');
})
.prefix('api/v1')
.namespace('Auth')
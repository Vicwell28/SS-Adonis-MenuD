'use strict'

const User = use('App/Models/User');

class AuthController {
    async login ({ auth, request, response }) {
        const { email, password } = request.only(User.store);

        const resul =  await auth.withRefreshToken().attempt(email, password); 
    
        return response.ok({
          "message" : {
            "status" : true, 
            "message" : "Haz iniciado sesion exitosamente"
          }, 
          "data" : resul
        })
    }
    
    async logout ({ auth, response }) {
    
        const apiToken = auth.getAuthHeader()

        await auth
        .authenticator('jwt')
        .revokeTokens([apiToken], true)
    
        return response.ok({
          "message" : {
            "status" : true, 
            "message" : "Haz cerrado sesion exitosamente", 
          }, 
          "data" : auth.check()
        })
        
    }
    
      async signIn ({request, auth ,response}){

        const userData = request.only(User.store);
    
        const user = await User.create(userData);
    
        // const rol =  await Rol.findBy({name : 'invitado'})
    
        // const r = await user.Rol().associate(rol)
    
        const resul =  await auth.withRefreshToken().attempt(userData.email, userData.password); 
    
    
        return response.ok({
          "message" : {
            "status" : true, 
            "message" : "Te has registrado con exito."
          },
          "data" : resul
        });
      }
}

module.exports = AuthController

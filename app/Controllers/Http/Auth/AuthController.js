'use strict'

const User = use('App/Models/User');
const Rol = use('App/Models/Rol');

class AuthController {
    async login ({ auth, request, response }) {
        console.log("Entro En El Controller"); 
        const { email, password } = request.only(User.store);
        console.log({email, password})
        return resul =  await auth.withRefreshToken().attempt(email, password); 
        console.log("NO paso")
    
    
        return response.ok({
          "message" : {
            "status" : true, 
            "message" : "Haz iniciado sesion exitosamente"
          }, 
          "data" : resul
        })
        //VALIDAR LOS CAMPOS
      }
    
      async logout ({ auth, request, response }) {
    
        const apiToken = auth.getAuthHeader()
        console.log(apiToken); 
    
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
    
        console.log(user);
    
        const rol =  await Rol.findBy({name : 'invitado'})
    
        const r = await user.Rol().associate(rol)
    
        const resul =  await auth.withRefreshToken().attempt(user.email, user.password); 
    
    
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

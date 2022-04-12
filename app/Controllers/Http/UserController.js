'use strict'
const User = use('App/Models/User');

class UserController {

    async login ({ auth, request, response }) {
        const { email, password } = request.only(User.store);
        console.log({email, password})
        const resul =  await auth.withRefreshToken().attempt(email, password); 
    
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
    
        console.log(userData);
        console.log(user);
        
        const resul =  await auth.withRefreshToken().attempt(userData.email, userData.password); 
    
    
        return response.ok({
          "message" : {
            "status" : true, 
            "message" : "Te has registrado con exito."
          },
          "data" : resul
        });
      }

      /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ response, auth }) {
      const users = await User
      .query()
      .with('Rol')
      .fetch()
      
      return response.ok({
        "message" : {
          "status" : true, 
          "message" : "El Usuario Fue Registrado Exitosamente", 
        },
        "data" : users
      })
  }

  /**
   * Create/save a new user.
   * POST users
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) { 
    const userData = request.only(User.store);

    const user = await User.create(userData);

    return response.ok({
      "message" : {
        "status" : true, 
        "message" : "Te has registrado con exito.", 
      },
      "data" : user
    });
  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, auth }) {

    try{
      const a =  auth.user
      const b = await a.with('Rol').fetch()      
    
      return response.ok({
        "message" : {
          "status" : true, 
          "message" : "Tu Usuario Fue Encontrado Con Exito", 
        },
        "data" : b
      })
    }
    catch(error){
      return response.status(500).json({
        "message" : {
          "status" : false, 
          "message" : "Tu Usuario No Fue Encontrado", 
        },
        "data" : error
      })
    }
    

  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ auth, request, response, params }) {
   const userdata =  await User.findOrFail(auth.user.id)

    const inputs = request.only(['username', 'email', 'password'])

    userdata.username = inputs.username; 
    userdata.email = inputs.email; 
    userdata.password = inputs.password; 

    userdata.save();

    const json = userdata.toJSON()

    return response.ok({
      "message" : {
        "status" : true, 
        "message" : "Tu Usuario Fue Actualizado Correctamente", 
      },
      "data" : json
    })
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ auth, request, response }) {
    
    const userdata = await User.findOrFail(auth.user.id);

    userdata.soft_delete = !userdata.soft_delete; 

    userdata.save();

    const json = userdata.toJSON();

    return response.ok({
      "message" : {
        "status" : true, 
        "message" : "Tu Usuario Fue Eliminado Correctamente", 
      },
      "data" : json
    })
  }
}

module.exports = UserController

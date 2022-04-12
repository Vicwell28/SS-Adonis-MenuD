'use strict'

const User = use('App/Models/User');

class UserController {
    /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ response }) {
      const users = await User
      .query()
      .with('Role')
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
  async show ({ response, auth }) {

    const a = await User.findOrFail(auth.user.id);

    //AGREAGAR EL ROL
    
    return response.ok({
    "message" : {
        "status" : true, 
        "message" : "Tu Usuario Fue Encontrado Con Exito", 
    },
    "data" : a
    })
   
    

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

    return response.ok({
      "message" : {
        "status" : true, 
        "message" : "Tu Usuario Fue Actualizado Correctamente", 
      },
      "data" : userdata
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
  async destroy ({ auth, response }) {
    
    const userdata = await User.findOrFail(auth.user.id);

    userdata.status = !userdata.status; 

    userdata.save();

    return response.ok({
      "message" : {
        "status" : true, 
        "message" : "Tu Usuario Fue Eliminado Correctamente", 
      },
      "data" : userdata
    })
  }
}

module.exports = UserController

'use strict'

const Role = use('App/Models/Role');

class RoleController {
     /**
   * Show a list of all rols.
   * GET rols
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    try{
      const rols = await Rol.all()
        
      return response.status(200).json({
        "message" : {
          "status" : true, 
          "message" : "Estos Son Todos Los Roles", 
        },
        "data" : roles
      })
    }
    catch (error){
      return response.status(200).json({
        "message" : {
          "status" : false, 
          "message" : "No Se Encontraron Los Roles", 
        },
        "data" : error
      })
    }
  }

  /**
   * Create/save a new rol.
   * POST rols
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const rolData = request.only(Rol.store)

    const rols = await Rol.create(rolData)

    return response.status(200).json({
      "message" : {
        "status" : true, 
        "message" : "El Usuario Fue Registrado Exitosamente", 
      },
      "data" : rols
    })

  }

  /**
  * Display a single Rol.
  * GET rols/:id
  *
  * @param {object} ctx
  * @param {Request} ctx.request
  * @param {Response} ctx.response
  * @param {View} ctx.view
  */
  async show ({ params, response }) {

  try{
    const Rol = await Rol.findOrFail(params.id); 
    
    return response.ok({
      "message" : {
        "status" : true, 
        "message" : "La Rol Fue Encontrada Exitosamente", 
      },
      
      "data" : Rol
    })
  }
  catch(error){
    return response.status(500).json({
      "message" : {
        "status" : false, 
        "message" : "La Rol No Fue Encontrada", 
      },
    
      "data" : error
    })
  }

  }

  /**
  * Update Rol details.
  * PUT or PATCH rols/:id
  *
  * @param {object} ctx
  * @param {Request} ctx.request
  * @param {Response} ctx.response
  */
  async update ({ request, response, params }) {
      try{
        const inputs = request.only(Rol.store)
        const Rol = await Rol.findOrFail(params.id)

        Rol.name = inputs.name;

        await Rol.save();

        return response.ok({
          "message" : {
            "status" : true, 
            "message" : "La Rol Fue Actualizada Correctamente", 
          },
          
          "data" : Rol
        })
      }
      catch(error){
        return response.status(500).json({
          "message" : {
            "status" : false, 
            "message" : "Operacion Fallida", 
          },
          "data" : error
        })
      }
  }

  /**
  * Delete a Rol with id.
  * DELETE rols/:id
  *
  * @param {object} ctx
  * @param {Request} ctx.request
  * @param {Response} ctx.response
  */
  async destroy ({ response, params }) {

  try{
    const rol = await Rol.findOrFail(params.id);

    Rol.status = !Rol.status; 

    await Rol.save();

    return response.ok({
      "message" : {
        "status" : true, 
        "message" : "La Rol Fue Eliminada Correctamente", 
      },
      "data" : rol
    })
  }
  catch(error){
    return response.status(500).json({
      "message" : {
        "status" : false, 
        "message" : "Operacion Fallida", 
      },
      "data" : error
    })
  }
  }
}

module.exports = RoleController

'use strict'

class ViewController {
     /**
   * Show a list of all vistas.
   * GET s
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async index ({ response }) {

    try{
      // const vistas = await Vista.query().with('Categoria').fetch()
      const vistas = await Vista.all()
    
      return response.ok({
        "message" : {
          "status" : true, 
          "message" : "Todas Las Vistas Fueron Encontradas Exitosamente", 
        },
        "data" : vistas
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
 * Create/save a new vista.
 * POST vistas
 * @param {object} ctx
 * @param {Request} ctx.request
 * @param {Response} ctx.response
 */
async store ({ request, response }) { 

  try{
    const vistaDatos = request.only(Vista.store);

    const vista = await Vista.create(vistaDatos);

    return response.ok({
      "message" : {
        "status" : true, 
        "message" : "La Vista Se Ha Registrado Exitosamente.", 
      },
      "data" : vista
    });
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
 * Display a single vista.
 * GET vistas/:id
 *
 * @param {object} ctx
 * @param {Request} ctx.request
 * @param {Response} ctx.response
 * @param {View} ctx.view
 */
async show ({ params, response }) {

  try{
    const vista = await Vista.findOrFail(params.id); 
    
    return response.ok({
      "message" : {
        "status" : true, 
        "message" : "La Vista Fue Encontrada Exitosamente", 
      },
      
      "data" : vista
    })
  }
  catch(error){
    return response.status(500).json({
      "message" : {
        "status" : false, 
        "message" : "La Vista No Fue Encontrada", 
      },
      "data" : error
    })
  }
  
}

/**
 * Update vista details.
 * PUT or PATCH vistas/:id
 *
 * @param {object} ctx
 * @param {Request} ctx.request
 * @param {Response} ctx.response
 */
async update ({ request, response, params }) {

  try{
    const inputs = request.only(Vista.store)
    const vista = await Vista.findOrFail(params.id)

    vista.name = inputs.name;
    vista.icono = inputs.icono;
    vista.nivel = inputs.nivel;
    vista.ruta = inputs.ruta;
    // vista.opciones = inputs.opciones;
    vista.status = inputs.status;
    vista.categoria_id = inputs.categoria_id;

    const res = await vista.save();

    return response.ok({
      "message" : {
        "status" : true, 
        "message" : "La Vista Fue Actualizada Correctamente", 
      },
      "data" : vista
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
 * Delete a vista with id.
 * DELETE vistas/:id
 *
 * @param {object} ctx
 * @param {Request} ctx.request
 * @param {Response} ctx.response
 */
async destroy ({ response, params }) {

  try{
    const vista = await Vista.findOrFail(params.id);

    vista.status = !vista.status; 

    await vista.save();

    return response.ok({
      "message" : {
        "status" : true, 
        "message" : "La Vista Fue Eliminada Correctamente", 
      },
      "data" : vista
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

module.exports = ViewController
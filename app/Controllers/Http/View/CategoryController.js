'use strict'

class CategoryController {
    /**
   * Show a list of all categorias.
   * GET categorias
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async index ({ response, auth }) {
    try{
      const categorias = 
      await Categoria
      .query()
      .with('Vista', (buildre) => {
        buildre.whereHas('Rols', (builder) => {builder.where('rol_id', auth.user.rol_id)})
      })
      .fetch()

      return response.ok({
        "message" : {
          "status" : true, 
          "message" : "Todas Las Categorias Fueron Encontradas Exitosamente", 
        },
        "data" : categorias
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
 * Create/save a new categoria.
 * POST categorias
 * @param {object} ctx
 * @param {Request} ctx.request
 * @param {Response} ctx.response
 */
async store ({ request, response }) { 

  try{
    const categoriaData = request.only(Categoria.store);

    const categoria = await Categoria.create(categoriaData);

    return response.ok({
      "message" : {
        "status" : true, 
        "message" : "La Categoria Se Ha Registrado Exitosamente.", 
      },
      "data" : categoria
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
 * Display a single categoria.
 * GET categorias/:id
 *
 * @param {object} ctx
 * @param {Request} ctx.request
 * @param {Response} ctx.response
 * @param {View} ctx.view
 */
async show ({ params, response }) {

  try{
    const categoria = await Categoria.findOrFail(params.id); 
    
    return response.ok({
      "message" : {
        "status" : true, 
        "message" : "La Categoria Fue Encontrada Exitosamente", 
      },
      "data" : categoria
    })
  }
  catch(error){
    return response.status(500).json({
      "message" : {
        "status" : false, 
        "message" : "La Categoria No Fue Encontrada", 
      },
      "data" : error
    })
  }
  
}

/**
 * Update categoria details.
 * PUT or PATCH categorias/:id
 *
 * @param {object} ctx
 * @param {Request} ctx.request
 * @param {Response} ctx.response
 */
async update ({ request, response, params }) {

  try{
    const inputs = request.only(Categoria.store)
    const categoria = await Categoria.findOrFail(params.id)

    categoria.name = inputs.name;
    categoria.icono = inputs.icono;
    categoria.nivel = inputs.nivel;
    categoria.opciones = inputs.opciones;
    categoria.status = inputs.status;

    const res = await categoria.save();

    return response.ok({
      "message" : {
        "status" : true, 
        "message" : "La Categoria Fue Actualizada Correctamente", 
      },
      "data" : categoria
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
 * Delete a categoria with id.
 * DELETE categorias/:id
 *
 * @param {object} ctx
 * @param {Request} ctx.request
 * @param {Response} ctx.response
 */
async destroy ({ response, params }) {

  try{
    const categoriadata = await Categoria.findOrFail(params.id);

    categoriadata.status = !categoriadata.status; 

    await categoriadata.save();

    return response.ok({
      "message" : {
        "status" : true, 
        "message" : "La Categoria Fue Eliminada Correctamente", 
      },
      "data" : categoriadata
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

module.exports = CategoryController

"use strict";

const Category = use("App/Models/Category");

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
  async index({ response }) {
    const categories = await Category.all();

    // const categories = await Category
    //   .query()
    //   .whereHas('View', (builder) => {
    //     builder.where('status', 1)
    //   })
    //   .with('View')
    //   .fetch()

    return response.ok({
      message: {
        status: true,
        message: "Todas Las Categorias Fueron Encontradas Exitosamente",
      },
      data: categories,
    });
  }

  /**
   * Create/save a new categoria.
   * POST categorias
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const categoriaData = request.only(Category.store);

    const categoria = await Category.create(categoriaData);

    return response.ok({
      message: {
        status: true,
        message: "La Category Se Ha Registrado Exitosamente.",
      },
      data: categoria,
    });
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
  async show({ params, response }) {
    try {
      const categoria = await Category.findOrFail(params.id);

      return response.ok({
        message: {
          status: true,
          message: "La Category Fue Encontrada Exitosamente",
        },
        data: categoria,
      });
    } catch (error) {
      return response.status(500).json({
        message: {
          status: false,
          message: "La Category No Fue Encontrada",
        },
        data: error,
      });
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
  async update({ request, response, params }) {
    try {
      const categoria = await Category.findOrFail(params.id);

      categoria.merge(request.only(Category.store));

      const res = await categoria.save();

      return response.ok({
        message: {
          status: true,
          message: "La Category Fue Actualizada Correctamente",
        },
        data: res,
      });
    } catch (error) {
      return response.status(500).json({
        message: {
          status: false,
          message: "Operacion Fallida",
        },
        data: error,
      });
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
  async destroy({ response, params }) {
    try {
      const categoriadata = await Category.findOrFail(params.id);

      categoriadata.status = !categoriadata.status;

      await categoriadata.save();

      return response.ok({
        message: {
          status: true,
          message: "La Category Fue Eliminada Correctamente",
        },
        data: categoriadata,
      });
    } catch (error) {
      return response.status(500).json({
        message: {
          status: false,
          message: "Operacion Fallida",
        },
        data: error,
      });
    }
  }

  async getCategoryByRole({response, auth}){
    const { role_id } = auth.user; 

      const categories = await Category
      .query()
      .whereHas('View', (builder) => {
        builder.whereHas('Roles', (builder) => {
          builder.where('status', true)
          builder.where('role_id', role_id)
        })
      })
      .with('View', (builder) => {
        builder.where('status', true)
        builder.whereHas('Roles')
      })
      .fetch()

      return response.ok({
        "message" : {
          "status" : true, 
          "message" : "Todas Las Categorias Fueron Encontradas Exitosamente", 
        },
        "data" : categories
      })
  }
}

module.exports = CategoryController;

"use strict";

const Role = use("App/Models/Role");

class RoleController {
  /**
   * Show a list of all role.
   * GET role
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ response }) {
    try {
      // const role = await Role.all();
      const role = await Role
      .query()
      .withCount('View as total_vistas')
      .fetch()

      return response.status(200).json({
        message: {
          status: true,
          message: "Estos Son Todos Los role",
        },
        data: role,
      });
    } catch (error) {
      return response.status(200).json({
        message: {
          status: false,
          message: "No Se Encontraron Los role",
        },
        data: error,
      });
    }
  }

  /**
   * Create/save a new Role.
   * POST role
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const rolData = request.only(Role.store);

    const role = await Role.create(rolData);

    return response.status(200).json({
      message: {
        status: true,
        message: "El Usuario Fue Registrado Exitosamente",
      },
      data: role,
    });
  }

  /**
   * Display a single Role.
   * GET role/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, response }) {
    try {
      const role = await Role.findOrFail(params.id);

      return response.ok({
        message: {
          status: true,
          message: "La Role Fue Encontrada Exitosamente",
        },

        data: role,
      });
    } catch (error) {
      return response.status(500).json({
        message: {
          status: false,
          message: "La Role No Fue Encontrada",
        },

        data: error,
      });
    }
  }

  /**
   * Update Role details.
   * PUT or PATCH role/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ request, response, params }) {
    try {
      const inputs = request.only(Role.store);

      const role = await Role.findOrFail(params.id);

      role.name = inputs.name;

      await role.save();

      return response.ok({
        message: {
          status: true,
          message: "La Role Fue Actualizada Correctamente",
        },

        data: role,
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
   * Delete a Role with id.
   * DELETE role/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ response, params }) {
    try {
      const role = await Role.findOrFail(params.id);

      role.status = !role.status;

      await role.save();

      return response.ok({
        message: {
          status: true,
          message: "La Role Fue Eliminada Correctamente",
        },
        data: role,
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

  async assignView({ response, request }) {
    const { role_id, view_id } = request.all();

    const role = await Role.findOrFail(role_id)

    await role.View().sync(view_id);

    return response.ok({
      message: {
        status: true,
        message: "Las vistas fueran asignadas correctamente",
      },
      data: role,
    });
  }
}

module.exports = RoleController;

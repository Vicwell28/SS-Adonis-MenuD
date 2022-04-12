'use strict'

const RoleView = use('App/Models/RoleView');

class RoleViewController {
    /**
   * Show a list of all rolvistas.
   * GET rolvistas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
     async index ({ response }) {

        try{
          const rolvistas = await RolVista.all()
        
          return response.ok({
            "message" : {
              "status" : true, 
              "message" : "Todas Las Vistas Asignadas A Cada Rol Fueron Encontradas Exitosamente", 
            },
            "data" : rolvistas
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
     * Create/save a new rolvista.
     * POST rolvistas
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async store ({ request, response }) { 
    
      try{
        const rolvistaData = request.only(RolVista.store);
    
        const rolvista = await RolVista.create(rolvistaData);
    
        return response.ok({
          "message" : {
            "status" : true, 
            "message" : "La Vista Asignada A Un Rol Se Ha Registrado Exitosamente.", 
          },
          "data" : rolvista
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
     * Display a single rolvista.
     * GET rolvistas/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async show ({ params, response }) {
    
      try{
        const rolvista = await RolVista.findOrFail(params.id); 
        
        return response.ok({
          "message" : {
            "status" : true, 
            "message" : "La Vista Asignada A Un Rol Fue Encontrada Exitosamente", 
          },
          "data" : rolvista
        })
      }
      catch(error){
        return response.status(500).json({
          "message" : {
            "status" : false, 
            "message" : "La Vista Asignada A Un Rol No Fue Encontrada", 
          },
          "data" : error
        })
      }
      
    }
    
    /**
     * Update rolvista details.
     * PUT or PATCH rolvistas/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async update ({ request, response, params }) {
    
      try{
        const inputs = request.only(RolVista.store)
        const rolvista = await RolVista.findOrFail(params.id)
    
        rolvista.rol_id = inputs.rol_id;
        rolvista.vista_id = inputs.vista_id;
    
        const res = await rolvista.save();
    
        return response.ok({
          "message" : {
            "status" : true, 
            "message" : "La Vista Asignada A Un Rol Fue Actualizada Correctamente", 
          },
          
          "data" : rolvista
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
     * Delete a rolvista with id.
     * DELETE rolvistas/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async destroy ({ response, params }) {
    
      try{
        const categoriadata = await RolVista.findOrFail(params.id);
    
        //AGREGAR UN STATUS A ESTA MIGRACIN
        categoriadata.rol_id =  0; 
    
        await categoriadata.save();
    
        return response.ok({
          "message" : {
            "status" : true, 
            "message" : "Una Vista Asignada A Un Rol Fue Eliminado Fue Eliminada Correctamente", 
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

module.exports = RoleViewController

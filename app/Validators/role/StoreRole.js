'use strict'
const Validator = use('Validator')
const Database = use('Database')

class StoreRole {
  get validateAll () {
    return true
  }

  async fails (errorMessages) {
    return this.ctx.response.send(errorMessages)
  }

  get rules () {
    return {
      name : 'required|min:3|max:25'
    }
  }

  get messages () {
    return {
      'name.min' : {"status" : false, "message" : 'El rol debe tener minimo 3 letras.'}, 
      'name.max' : {"status" : false, "message" : 'El rol debe tener maxiomo 25 letras.'}, 
      'name.required' : {"status" : false, "message" : 'No puedes dejar el rol vacio.'},
    }
  }
}

module.exports = StoreRole

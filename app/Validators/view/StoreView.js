'use strict'
const Validator = use('Validator')
const Database = use('Database')

class StoreView {
  get validateAll () {
    return true
  }

  async fails (errorMessages) {
    return this.ctx.response.send(errorMessages)
  }

  get rules () {
    return {
      name : 'required|min:3|max:25|unique:vistas,name'
    }
  }

  get messages () {
    return {
      'name.min' : {"status" : false, "message" : 'El rol debe tener minimo 3 letras.'}, 
      'name.max' : {"status" : false, "message" : 'El rol debe tener maxiomo 25 letras.'}, 
      'name.required' : {"status" : false, "message" : 'No puedes dejar el rol vacio.'},
      'name.unique' : {"status" : false, "message" : 'La vista ya esta registrada.'}, 
    }
  }
}

module.exports = StoreView


const existsFn = async (data, field, message, args, get) => {
  const value = get(data, field)
  if (!value) {
    return
  }

  const [table, column] = args
  const row = await Database.table(table).where(column, value).first()

  if (!row) {
    throw message
  }
}
Validator.extend('exists', existsFn)

'use strict'

const Validator = use('Validator')
const Database = use('Database')

class LoginAuth {
  get validateAll () {
    return true
  }

  async fails (errorMessages) {
    return this.ctx.response.send(errorMessages)
  }

  get rules () {
    return { 
      email : 'required|min:3|max:100|exists:users,email',
      password : 'required|min:3|max:25'
    }
  }

  get messages () {
    return {
      'email.min' : {"status" : false, "message" : 'El correo electronico debe tener minimo 3 letras.'},      
      'email.max' : {"status" : false, "message" : 'El correo electronico debe tener maxiomo 100 letras.'}, 
      'email.required' : {"status" : false, "message" : "No puedes dejar el correo electronico vacio."},
      'email.exists' : {"status" : false, "message" : 'El correo electronico aun no esta registado'}, 
      'password.min' : {"status" : false, "message" : 'El contraseña debe tener minimo 3 letras.'}, 
      'password.max' : {"status" : false, "message" : 'El contraseña debe tener maxiomo 25 letras.'}, 
      'password.required' : {"status" : false, "message" : 'No puedes dejar el contraseña vacio.'},
    }
  }
}

module.exports = LoginAuth



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

'use strict'
const Validator = use('Validator')
const Database = use('Database')

class SigninAuth {
  get validateAll () {
    return true
  }

  async fails (errorMessages) {
    return this.ctx.response.send(errorMessages)
  }

  //CHECAR EL METODO INDEX
  get rules () {
    return {
      username : 'required|min:3|max:25',
      email: 'required|email|unique:users,email',
      password: 'required'
    }
  }

  get messages () {
    return {
      'username.min' : {"status" : false, "message" : 'El nombre de usuario debe tener minimo 3 letras.'}, 
      'username.max' : {"status" : false, "message" : 'El nombre de usuario debe tener maxiomo 25 letras.'}, 
      'username.required' : {"status" : false, "message" : 'No puedes dejar el nombre de usuario vacio.'},
      'email.required': {"status" : false, "message" : 'No puedes dejar el campo correo electronico vacio.'},
      'email.unique': {"status" : false, "message" : 'El correo electronico ya esta registrado'},
      'email.email': {"status" : false, "message" : 'Debes colocar un correo electronico valido.'},
      'password.required': {"status" : false, "message" : 'No puede dejar el campo de contaseña vacio.'}
    }
  }
}

module.exports = SigninAuth

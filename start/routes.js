'use strict'
use('./routes/routesAuth');
use('./routes/routesCategoria');
use('./routes/routesRol');
use('./routes/routesRolVista');
use('./routes/routesUser');
use('./routes/routesVista');
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

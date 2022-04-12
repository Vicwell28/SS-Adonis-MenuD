'use strict'
use('./routes/routesAuth.js');
use('./routes/routesCategory.js');
use('./routes/routesRole.js');
use('./routes/routesRoleView.js');
use('./routes/routesUser.js');
use('./routes/routesView.js');

const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

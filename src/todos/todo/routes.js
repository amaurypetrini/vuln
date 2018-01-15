'use strict';

const Controller = require('./controller');
const Validator = require('./schema');

exports.register = (server, options, next) => {
  // instantiate controller
  const controller = new Controller(server.database);

  server.bind(controller);
  server.route([
    {
      method: 'GET',
      path: '/todo',
      config: {
        auth: false,
        handler: controller.list,
        validate: Validator.list()
      }
    },
    {
      method: 'GET',
      path: '/todo/{id}',
      config: {
        auth: false,
        handler: controller.read,
        validate: Validator.read()
      }
    },
    {
      method: 'POST',
      path: '/todo',
      config: {
        auth: false,
        handler: controller.create,
        validate: Validator.create()
      }
    },
    {
      method: 'PUT',
      path: '/todo/{id?}',
      config: {
        auth: false,
        handler: controller.update,
        validate: Validator.update()
      }
    },
    {
      method: 'DELETE',
      path: '/todo/{id?}',
      config: {
        auth: false,
        handler: controller.destroy,
        validate: Validator.destroy()
      }
    }
  ]);

  next();
};

exports.register.attributes = {
  name: 'todo-route',
  version: '1.0.0'
};

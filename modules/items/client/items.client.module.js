(function (app) {
  'use strict';

  app.registerModule('items', ['core']);
  app.registerModule('items.services');
  app.registerModule('items.routes', ['ui.router', 'core.routes', 'items.services']);
}(ApplicationConfiguration));

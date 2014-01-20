(function (exports) {

  "use strict";

  var crudUtils = require('../utils/crudUtils');

  function index(req, res) {
    res.render('index', { 'title': 'Scale WS' });
  }

  exports.init = function (app, model) {
    app.get('/', index);
    crudUtils.initRoutesForModel({ 'app': app, 'model': model });
  };

}(exports));
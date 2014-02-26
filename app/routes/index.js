(function (exports) {

  "use strict";

  function index(req, res) {
    res.render('index', { 'title': 'Scale WS' });
  }

  exports.init = function (app) {
    app.get('/', index);
  };

}(exports));
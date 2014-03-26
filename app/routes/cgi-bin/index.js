(function (exports) {
  var view;
  var router = function() {
    return function (req, res) {
      var page = req.params.page,
        version = req.params.version || '';

      if (version !== '') version += '/';

      if (version === '' && page === 'index') {
        // avoid infinite loop
        fail();
      } else {
        try {
          var func = require('./' + version + page);
        } catch ( e ) {
          console.log('Invalid request: ' + version + page );
          fail();
        }

        if( func ) {
          res.setHeader('Content-Type', 'text/plain');
          func(req,res,view);
        }
      }

      function fail() {
        res.send(404);
      }
    }
  }

  exports.init = function (app, scaleView) {
    this.view = scaleView;
    app.post('/cgi-bin/:page', router);
    app.post('/cgi-bin/:version/:page', router);
  };


}(exports));
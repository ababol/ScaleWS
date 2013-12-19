module.exports = function(measures) {
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
        func(req,res,measures);
      }
    }

    function fail() {
      res.send(404);
    }
  }
}
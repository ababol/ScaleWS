module.exports = function(req, res) {
  var page = req.params.page,
      version = req.params.version || '';

  if ( version !== '' ) version += '/';

  try {
    var func = require('./' + version + page);
  } catch ( e ) {
    console.log('Invalid request: ' + version + page );
    fail();
  }

  if( func ) {
    res.setHeader('Content-Type', 'text/plain');
    func(req,res);
  }

  function fail() {
    res.send(404);
  }

}
module.exports = function(app, express, mongoose){

  var config = this;


  //generic config
  app.configure(function(){
    app.set('port', process.env.PORT || 80);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.favicon());
    app.use(express.cookieParser());
    app.use(express.session({ secret: 'topsecret' }));
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
  });

  //env specific config
  app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

    mongoose.connect('mongodb://localhost/scalews_dev');
  });

  app.configure('production', function(){
    app.use(express.errorHandler());

    mongoose.connect('mongodb://localhost/scalesws');
  });

  return config;

};

module.exports = function(controller, app, path){
    var pathWithId;
    
    var errMsg = function(msg) {
        return {'error': {'message': msg.toString()}};
    };

    var httpCallback = function (err, result) {
        if (!err) {
          res.send(result);
        } else {
          res.send(errMsg(err));
        }
    };
    
    if (!app || !controller || !path) {
      return;
    }

    pathWithId = path + '/:id';


    app.get(path, function(req,res){
        controller.read({},function (err, result) {
            if (!err) {
              res.send(result);
            } else {
              res.send(errMsg(err));
            }
        });
    });

    app.post(path, function(req,res){
        controller.create(req.body, httpCallback);
    });

     app.get(path+'/weight', function(req,res){
        controller.read({type : 1}, httpCallback);
    });

    app.get(path+'/heart', function(req,res){
        controller.read({type: 11}, httpCallback);
    });
    app.get(path+'/temperature', function(req,res){
        controller.read({type: 12}, httpCallback);
    });
    app.get(path+'/fat', function(req,res){
        controller.read({type: 16}, httpCallback);
    });
    app.get(path+'/airquality', function(req,res){
        controller.read({type: 16}, httpCallback);
    });
    app.get(pathWithId, function(req,res){
        controller.read({_id: req.params.id}, httpCallback);
    });
    app.put(pathWithId, function(req,res){
        controller.update(req.body,  httpCallback);
    });
    app.del(pathWithId, function(req,res){
        controller.delete({_id: req.params.id}, httpCallback);
    });
};
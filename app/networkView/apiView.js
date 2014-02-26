module.exports = function(controller, app, path){
    var pathWithId;
    
    var errMsg = function(msg) {
        return {'error': {'message': msg.toString()}};
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
        controller.create(req.body,function (err, result) {
            if (!err) {
              res.send(result);
            } else {
              res.send(errMsg(err));
            }
        });
    });

     app.get(path+'/weight', function(req,res){
        controller.read({type : 1},function (err, result) {
            if (!err) {
              res.send(result);
            } else {
              res.send(errMsg(err));
            }
        });
    });

    app.get(path+'/heart', function(req,res){
        controller.read({type: 11},function (err, result) {
            if (!err) {
              res.send(result);
            } else {
              res.send(errMsg(err));
            }
        });
    });
    app.get(path+'/temperature', function(req,res){
        controller.read({type: 12},function (err, result) {
            if (!err) {
              res.send(result);
            } else {
              res.send(errMsg(err));
            }
        });
    });
    app.get(path+'/fat', function(req,res){
        controller.read({type: 16},function (err, result) {
            if (!err) {
              res.send(result);
            } else {
              res.send(errMsg(err));
            }
        });
    });
    app.get(path+'/airquality', function(req,res){
        controller.read({type: 16},function (err, result) {
            if (!err) {
              res.send(result);
            } else {
              res.send(errMsg(err));
            }
        });
    });
    app.get(pathWithId, function(req,res){
        controller.read({_id: req.params.id},function (err, result) {
            if (!err) {
              res.send(result);
            } else {
              res.send(errMsg(err));
            }
        });
    });
    app.put(pathWithId, function(req,res){
        controller.update(req.body, function (err, result) {
            if (!err) {
              res.send(result);
            } else {
              res.send(errMsg(err));
            }
        });
    });
    app.del(pathWithId, function(req,res){
        controller.delete({_id: req.params.id},function (err, result) {
            if (!err) {
              res.send(result);
            } else {
              res.send(errMsg(err));
            }
        });
    });
};
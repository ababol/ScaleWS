module.exports = function(app, path, Backbone, _){

    return Backbone.ServerView.extend({    

        initialize :  function () {

            var pathWithId = path + '/:id';

            httpCallback = function (err, result) {
                errMsg = function(msg) {
                    return {'error': {'message': msg.toString()}};
                };

                if (!err) {
                    this.res.send(result);
                } else {
                    this.res.send(errMsg(err));
                }
            };

            app.post(path, _.bind(function(req, res){
                httpCallback.call({req : req, res: res},null,this.collection.create(req.body));
            }, this));

            app.get(path, _.bind(function(req, res){
                httpCallback.call({req : req, res: res},null,this.collection.toJSON());
            }, this));

            app.get(path+'/weight', _.bind(function(req, res){
                httpCallback.call({req : req, res: res},null,this.collection.where({type : 1})); // 74892
            }, this));

            app.get(path+'/heart', _.bind(function(req, res){
                httpCallback.call({req : req, res: res},null,this.collection.where({type : 11})); 
            }, this));

            app.get(path+'/temperature', _.bind(function(req, res){
                httpCallback.call({req : req, res: res},null,this.collection.where({type : 12})); 
            }, this));

            app.get(path+'/fat', _.bind(function(req, res){
                httpCallback.call({req : req, res: res},null,this.collection.where({type : 16})); 
            }, this));

            app.get(path+'/airquality', _.bind(function(req, res){
                httpCallback.call({req : req, res: res},null,this.collection.where({type : 35})); 
            }, this));

            app.get(pathWithId, _.bind(function(req, res){
                console.log(req.params.id);
                httpCallback.call({req : req, res: res},null,this.collection.where({_id: req.params.id}));
            }, this));

            app.put(pathWithId, _.bind(function(req, res){
                httpCallback.call({req : req, res: res},null,this.collection.add(req.body));
            }, this));

            app.del(pathWithId, _.bind(function(req, res){
                httpCallback.call({req : req, res: res},null,this.collection.remove({_id: req.params.id}));
            }, this));
        }

    });
};
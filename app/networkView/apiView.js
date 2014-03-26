module.exports = function(app, path, Backbone, _, categoriesMasks){

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
                httpCallback.call({req : req, res: res},null,this.collection.add(req.body));
            }, this));

            app.get(path, _.bind(function(req, res){
                httpCallback.call({req : req, res: res},null,this.collection.toJSON());
            }, this));

            for (i in categoriesMasks){
                app.get(path+'/' +i, _.bind(function(req, res){
                    console.log("test : " +i);
                    httpCallback.call({req : req, res: res},null,_this.collection.where(categoriesMasks[i])); 
                    // httpCallback.call({req : req, res: res},null,_.where(this.collection.models, categoriesMasks[i])); 
                }, this));
            }

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
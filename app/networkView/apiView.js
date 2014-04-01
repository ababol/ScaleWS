module.exports = function(app, path, Backbone, _, categoriesMasks){

    return Backbone.ServerView.extend({    

        initialize :  function () {

            if(!this.collection){
                console.log("APIView can't access to the collection");
            }

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

            getWhere = function(collection, mask){
                var result = [];
                var match;
                _.each(collection.models, function(item){
                    match = true;
                    for(var i in mask){
                        if(mask[i] != item.get(i))
                            match = false;
                    }
                    if(match)
                        result.push(item.attributes);
                }, this);
                return result;
            };

            app.post(path, _.bind(function(req, res){
                httpCallback.call({req : req, res: res},null,this.collection.add(req.body));
            }, this));

            app.get(path, _.bind(function(req, res){
                httpCallback.call({req : req, res: res},null,this.collection.toJSON());
            }, this));

            _.each(categoriesMasks, function(mask, category){
                app.get(path+'/'+category, _.bind(function(req, res){
                    httpCallback.call({req : req, res: res},null,getWhere(this.collection, mask));
                }, this));
            }, this);

            app.get(pathWithId, _.bind(function(req, res){
                console.log(req.params.id);
                httpCallback.call({req : req, res: res},null,getWhere(this.collection,{_id: req.params.id}));
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
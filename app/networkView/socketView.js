module.exports = function(socketio, Backbone, _){

  return Backbone.ServerView.extend({    
    initialize :  function () {
      // this.collection.bind('add', this.change, this);
      // this.collection.bind('reset', this.addAll, this);
      // this.collection.bind('all', this.render, this);
      this.collection.bind('all', this.all, this);

      //Init socket listners
      this.main = socketio.of('/main');
      this.main.on('connection', function (socket) {
        //politeness
        socket.emit('news', "hello you !");
        socket.broadcast.emit('news', "new user connected");

      });

      socketio.of('/create').on('connection', _.bind(function(socket){
        socket.on('ask', _.bind(
          function (obj){
            this.collection.add(obj, function (result) {
              socket.emit('answer', result);
            });
          }, {collection: this.collection}) 
        )
      },this));
      
      socketio.of('/read').on('connection', _.bind(function(socket){
        socket.on('ask', _.bind(
          function (query){
            socket.emit('answer', this.collection.toJSON());
          }, {collection: this.collection}) 
        )
      },this));

      socketio.of('/update').on('connection',_.bind(function(socket){
        socket.on('ask', _.bind(
          function (query){
            // socket.emit('answer', this.collection.add(query));
            console.log("update");
            this.collection.remove(this.collection.at(query._id));
            this.collection.add(query);
          }, {collection: this.collection}) 
        )
      },this));

      socketio.of('/delete').on('connection',_.bind(function(socket){
        socket.on('ask', _.bind(
          function (query){
            socket.emit('answer',this.collection.remove(query));
          }, {collection: this.collection}) 
        )
      },this));
    },
    all : function(event, model, collection){
      console.log(event);
      // this.main.send("change", this.collection.toJSON());
    }
  });

}; 
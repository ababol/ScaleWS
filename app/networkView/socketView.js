module.exports = function(controller, socketio){
  
  socketio.of('/politness').on('connection', function (socket) {
    //politeness
    socket.emit('news', "hello you !");
    socket.broadcast.emit('news', "new user connected");

  });

  socketio.of('/create').on('connection', function(socket){
    socket.on('ask', function (query){
      controller.create(query, function (err, result) {
        if (!err) {
          socket.emit('answer',result);
        } else {
          socket.emit('error', err);
        }
      });
    });
  });

  socketio.of('/read').on('connection', function(socket){
    socket.on('ask', function (query){
      controller.read(query, function (err, result) {
        if (!err) {
          socket.emit('answer',result);
        } else {
          socket.emit('error', err);
        }
      });
    });
  });

  socketio.of('/update').on('connection', function(socket){
     socket.on('ask', function (query){
      controller.update(query, function (err, result) {
        if (!err) {
          socket.emit('answer',result);
        } else {
          socket.emit('error', err);
        }
      });
    });
  });

  socketio.of('/delete').on('connection', function(socket){
    socket.on('ask', function (query){
      controller.delete(query, function (err, result) {
        if (!err) {
          socket.emit('answer',result);
        } else {
          socket.emit('error', err);
        }
      });
    });
  });

}; 
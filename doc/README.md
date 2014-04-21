ScaleWS
=======
#How to hack the scale
First, you need to register the scale to a network/hotspot controlled by you. When the scale is registered, you can configure the DNS Server.

Indeed, in order to hack the scale, you need to redirect the domain scalews.withings.net directly on your server.<br/>
This server host the ScaleWS application:

<img src="https://raw.githubusercontent.com/Fedonono/ScaleWS/master/doc/scalews_dns_schema.png" width="562" height="505"/>

On a GNU/Linux system, you can configure your own DNS-Server with [bind9](https://wiki.debian.org/Bind9), here is [an example](https://raw.githubusercontent.com/Fedonono/ScaleWS/master/doc/resources/example_dns_config.zip).

# How does ScaleWS work

<img src="https://raw.githubusercontent.com/Fedonono/ScaleWS/master/doc/scalews_archi.png" width="550" height="720"/>

## Server

For this application we use a Node.JS Server. It reuses the client's backbone.js collection and model to process data. But in the server case, the collection is sync with a MongoDB database.<br/>
When the server starts, it fetches the collection and get the data from the database. When the collection detects new data or any change, it affects the MongoDB database thanks to the overridden function <i>Backbone.sync</i>.

####Configuration
We want to make the code independent from the data in to be able to reuse it for any other sensor.<br/>
So we define all specifics things about the scale in a unique file : [app/models/Server.Measure.Model.js](https://github.com/Fedonono/ScaleWS/blob/master/app/models/Server.Measure.Model.js) which adds some methods to the server backbone model.

In this file we define the structure of a measure :
```js
    MeasureModel.getSchemaLayout = function(){
        return {
            value: Number,
            type: Number,
            date: { type : Date, default : Date.now }
        };
    };
```
With the same way we define some mask for categories which is reuse by the API :
```js
     MeasureModel.getCategoriesMasks = function(){
        return {
            weight : {type : 1},
            heart : {type : 11},
            temperature: {type : 12},
            fat : {type : 16},
            airquality : {type : 35}
        };
    };
```

#### The interfaces
The Server Backbone Collection has three different 'Network-Views' :

* The Scale view :
This one is use by the Scale. It's requested by the scale when there are new data to send.
The scale post the data on with a simple HTTP Post request. New measures are in JSON. So we just keep the data give the correct answer to look like the withings server :
`app.post('/cgi-bin/measure', this.measure.bind(this));`

* The API view : 
This app provides a simple API REST which give access to the data using JSON. We can Create/Read/Update/Delete data using this API. The action call for the differents routes is defined in the `app/networkView/apiView.js` file.
```js
      app.post(path, _.bind(function(req, res){
          httpCallback.call({req : req, res: res},null,this.collection.create(req.body));
      }, this));
```
The default path is `/{MongoDB CollectionName}/[+ {id || category name}]`.
What is possible to do :

** Add new value : POST on /measure {new model}

** Get values : Get on /measure/[id || category]

** Update a value : PUT on /measure {updated model}

** Delete a value : DEL on /measure/[id] {old model}


* The Socket view :
This server view is used by our client web application. It is an interface which let you connect on websocket using the socket.io library.so yu can do CRUD operations by connecting on the good socket namespace and emit a message. Differents socket namespaces are `"/read" "/create" "/update" "/delete"`.
There is another namespace used to push any modification `"/main"`.



#### Create a Sensors View
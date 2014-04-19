
ScaleWS
=======

> Get and process data acquired from the scale (Withings WS50)

# What it does

![Demo GIF](https://raw.githubusercontent.com/Fedonono/ScaleWS/master/doc/demo.gif)

You can also add/update/delete a value by using the user interface.

# Install

1. Make sure you have [node installed](http://nodejs.org/).

2. Make sure you have access to a [mongoDB](https://www.mongodb.org/) database.

3. Install the required node dependencies:
```shell
npm install
```

4. (Optional) You can stock the data to a different collection by editing the [config.js](https://github.com/Fedonono/ScaleWS/blob/master/config.js) file, by default the data are stocked in <i>mongodb://localhost/scalews_dev</i>.<br/>
You can also import [our dumped MongoDB collection](https://github.com/Fedonono/ScaleWS#mongodb-dump).

5. Launch the Node Server: (it should install the client/bower dependencies automatically)
```shell
grunt dev
```

##[How to hack the scale](https://github.com/Fedonono/ScaleWS/blob/master/doc/README.md#how-to-hack-the-scale)

# Customization

## Client
### Add a predefined view
You can add a predefined view (Average/Text/Chart/Menu) by editing the [public/js/config.js](https://github.com/Fedonono/ScaleWS/blob/master/public/js/config.js) file.
```js
    views: {
      chart: { // type of view
        0: {
          el: "chart-weight", // DOM element (id)
          title: "Weight Chart", // Title of the view
          theme: dark, // Theme of the view -> public/styles/js/dark-light-theme.js
          type: 1 // What data do you want to display? Here 1 === weight
        },
```
You have also to add the DOM element in the [view/index.jade](https://github.com/Fedonono/ScaleWS/blob/master/views/index.jade) file.

### Add a custom view
You can add your own view by editing the [public/js/view/App.View.js](https://github.com/Fedonono/ScaleWS/blob/master/public/js/views/App.View.js) file.<br/>
You have to add your view(s) in the function below:
```js
initViews: function() {
  // Here is an example with HighChart Views
  // HighChartView -> public/views/measure/HighChart.View.js
  // Config -> public/js/config.js
  _.each(Config.views.chart, function(c) {
    new HighChartView(c, this.collection);
  }, this);
  // Add your custom view here
  // ...
}
```


## Server

For this application we use a Node.JS Server. This one reuse the clent's backbone.js collection and model to process data. But here, the collection is sync with a MondoDB database. When the server starting, it fetch the collection and so get all the data from the database and when the collection detect get new data or detect anny change it repercut it on the MongoDB database with the overiden "Backbone.sync".

####Configuration
We want to make the code independant to the data for be able to reuse it for any other sensors. So we define all specific things about the scale in a unique file : "Server.Measure.Model.js" which one add some methode to the server backbone model.

In this file we define the stucture of a measure :
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
The Server have three differents 'Network-Views' of the Server Backbone Collection :

* The Scale view :
This one is use by the Scale. It's requested by the scale when there are new data to send.
The scale post the data on with a simple HTTP Post request. New measures are in JSON. So we just keep the data give the correct answer to look like the withings server : 
`app.post('/cgi-bin/measure', this.measure.bind(this));` 

* The API view : 

* The Scale view : 

#### Create a Sensors View

# API
![DemoAPI GIF](https://raw.githubusercontent.com/Fedonono/ScaleWS/master/doc/demo_api.gif)

# Resources

##[How does ScaleWS work](https://github.com/Fedonono/ScaleWS/blob/master/doc/README.md#how-does-scalews-work)
##MongoDB Dump
Download & extract [the dump DB](https://raw.githubusercontent.com/Fedonono/ScaleWS/master/doc/resources/dump_scalews_dev.zip) and use this command to restore it:
```shell
mongorestore --noIndexRestore
```
##[Slides](http://fedonono.github.io/ScaleWS)

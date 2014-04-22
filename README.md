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

<!-- #### Create a Sensors View -->

# API
![DemoAPI GIF](https://raw.githubusercontent.com/Fedonono/ScaleWS/master/doc/demo_api.gif)

You can also add/update/delete data thanks to the API.<br/>
See the description of the [API View](https://github.com/Fedonono/ScaleWS/tree/master/doc#2-the-api-view-) for more details.

# Resources

##[How does ScaleWS work](https://github.com/Fedonono/ScaleWS/blob/master/doc/README.md#how-does-scalews-work)
##MongoDB Dump
Download & extract [the dump DB](https://raw.githubusercontent.com/Fedonono/ScaleWS/master/doc/resources/dump_scalews_dev.zip) and use this command to restore it:
```shell
mongorestore --noIndexRestore
```
##[Slides](http://fedonono.github.io/ScaleWS)

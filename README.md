ScaleWS
=======

> Get and process data acquired from the scale (Withings WS50)

## What it does

![Demo as a GIF](https://raw.githubusercontent.com/Fedonono/ScaleWS/master/doc/demo.gif)

## Install

### Install ScaleWS
### How to hack the scale

## Configuration

### Client
#### Add a View
#### Change Theme

### Server
For this application we use a Node.JS Server. This one reuse the clent's backbone.js collection and model to process data. But here, the collection is sync with a MondoDB database. When the server starting, it fetch the collection and so get all the data from the database and when the collection detect get new data or detect anny change it repercut it on the MongoDB database with the overiden "Backbone.sync".

####Configuration
We want to make the code independant to the data for be able to reuse it for any other sensors. So we define all specific things about the scale in a unique file : "Server.Measure.Model.js" which one add some methode to the server backbone model.

In this file we define the stucture of a measure :
    
    MeasureModel.getSchemaLayout = function(){
        return {
            value: Number,
            type: Number,
            date: { type : Date, default : Date.now }
        };  
    };
With the same way we define some mask for categories which is reuse by the API :

     MeasureModel.getCategoriesMasks = function(){
        return {
            weight : {type : 1},
            heart : {type : 11},
            temperature: {type : 12},
            fat : {type : 16},
            airquality : {type : 35}
        };
    };


#### The interfaces
The Server have three differents 'Network-Views' of the Server Backbone Collection :

* The Scale view :
This one is use by the Scale. It's requested by the scale when there are new data to send.
The scale post the data on with a simple HTTP Post request. New measures are in JSON. So we just keep the data give the correct answer to look like the withings server : 
`app.post('/cgi-bin/measure', this.measure.bind(this));` 

* The API view : 

#### Create a Sensors View

## Resources

### MongoDB Dump
### Wireshark Log



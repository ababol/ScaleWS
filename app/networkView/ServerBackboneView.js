module.exports = function (Backbone, _) {
    "use strict";

    var ServerView = Backbone.ServerView = function(options) {
        this.cid = _.uniqueId('serverview');
        this._configure(options || {});
        //each extends their own backbone model
        _.extend(this, _.omit(new Backbone.Model(),_.keys(ServerView.prototype) ) );
        
        this.initialize.apply(this, arguments);
    };


    _.extend(ServerView.prototype, Backbone.Events, {
        // Initialize is an empty function by default. Override it with your own
        // initialization logic.
        initialize: function() {
        },
        // Performs the initial configuration of a View with a set of options.
        // Keys with special meaning *(e.g. model, collection, id, className)* are
        // attached directly to the view.  See `viewOptions` for an exhaustive
        // list.
        _configure: function(options) {
            for(var i in options){
                this[i] = options[i];
            }
        }
    });
    Backbone.ServerView.extend = Backbone.Model.extend;

};
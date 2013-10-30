define('app/controllers/TheController', [
    'backbone',
    'marionette',
    'app/layouts/TheLayout'
], function (
    Backbone,
    Marionette,
    TheLayout
) {
    var initialization,
        routes,
        utils;

    initialization = {
        initialize: function(){
            this.on('module:initialize', this.onInitialize, this);
            this.on('module:finalize', this.onFinalize, this);
        },

        onInitialize: function(){
            this.layout = new TheLayout();
            this.options.App.body.show(this.layout);
        },

        onFinalize: function(){
            this.layout.close();
        }
    };

    routes = {};

    utils = {};

    return Marionette.Controller.extend(_.extend(initialization, routes, utils));
});

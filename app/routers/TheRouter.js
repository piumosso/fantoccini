define('app/routers/TheRouter', [
    'marionette'
], function(
    Marionette
){
    return Marionette.AppRouter.extend({
        before: function(route, args){
            this.options.App.startSubApp('The');
            this.options.controller.before(args);
        },

        appRoutes: {
            'try': 'doSomething'
        }
    });
});

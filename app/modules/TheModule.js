define('app/modules/TheModule', [
    'underscore',
    'app/routers/TheRouter',
    'app/controllers/TheController'
], function(
    _,
    TheRouter,
    TheController
){
    return function(App){
        App.module('The', {
            startWithParent: false,

            define: function(){
                var controller = new TheController({
                    App: App
                });

                App.addInitializer(function(){
                    new TheRouter({
                        App: App,
                        controller: controller
                    });
                });

                this.addInitializer(function(){
                    controller.trigger('module:initialize');
                });
                this.addFinalizer(function(){
                    controller.trigger('module:finalize');
                });
            }
        });
    };
});

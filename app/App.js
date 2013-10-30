define('app/App', [
    'jquery',
    'backbone',
    'backbone.routefilter',
    'marionette',
    'app/modules/TheModule'
], function(
    $,
    Backbone,
    backboneRoutefilter,
    Marionette,
    TheModule
){
    var App = new Marionette.Application();

    // Прогресс-лоадер
    (function(loaderSelector, loadingClass){
        var ajaxCounter = 0,
            toggleLoader;

        toggleLoader = function(){
            $(loaderSelector).toggleClass(loadingClass, ajaxCounter > 0);
        };
        $(document)
            .on('ajaxSend', function(){
                ajaxCounter++;
                toggleLoader();
            })
            .on('ajaxComplete', function(){
                ajaxCounter--;
                toggleLoader();
            });
    })('body', 'load');

    // Инициализация
    App.addRegions({
        body: 'body'
    });
    App.on('initialize:after', function(){
        // Показываем постоянные элементы
    });
    App.on('initialize:after', function(){
        TheModule(App);
    });
    App.on('initialize:after', function(){
        Backbone.history.start();
    });

    // Действие при старте модуля (вызывается из роутинга)
    App.startSubApp = function(moduleName){
        var currentApp = App.module(moduleName);
        
        if (App.currentApp === currentApp) {
            return;
        }
        if (App.currentApp) {
            App.currentApp.stop();
        }
        App.currentApp = currentApp;
        currentApp.start();
    };

    return App;
});

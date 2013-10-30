define('jade', ['jquery'], function($){
    var df = new $.Deferred();

    require(['static/js/libs/jade'], function(jade){
        df.resolve(jade);
    });

    return df;
});

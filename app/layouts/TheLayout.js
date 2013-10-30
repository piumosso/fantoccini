define('app/layouts/TheLayout', [
    'marionette'
], function(
    Marionette
){
    return Marionette.Layout.extend({
        template: 'app/templates/layouts/the.jade',

        regions: {}
    });
});

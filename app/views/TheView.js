define('app/views/TheView', [
    'underscore',
    'marionette'
], function(
    _,
    Marionette
){
    return Marionette.ItemView.extend({
        template: 'app/templates/the.jade',

        serializeData: function(){
            return {};
        }
    });
});

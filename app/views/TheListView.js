define('app/views/TheListView', [
    'marionette',
    'app/views/TheView'
], function(
    Marionette,
    TheView
){
    return Marionette.CompositeView.extend({
        template: 'app/templates/the.list.jade',

        itemView: TheView,

        itemViewContainer: ''
    });
});

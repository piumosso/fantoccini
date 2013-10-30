define('app/collections/TheCollection', [
    'app/collections/Collection',
    'app/models/TheModel'
], function(
    Collection,
    TheModel
){
    return Collection.extend({
        model: TheModel,

        url: ''
    });
});

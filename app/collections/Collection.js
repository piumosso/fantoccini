define('app/collections/Collection', [
    'backbone'
], function(Backbone){
    return Backbone.Collection.extend({
        initialize: function(){
            var that = this;

            this._isLoaded = false;
            this.on('request', function(){
                that._isLoaded = false;
            });
            this.on('sync', function(){
                that._isLoaded = true;
            });
            this.on('reset', function(){
                that._isLoaded = true;
            });
        },

        url: function(){
            var query;

            query = this.getQuery() || require.s.contexts._.config.urlArgs || '';
            if (query) {
                query = '?' + query;
            }

            return this.getBaseUrl() + query;
        },

        getBaseUrl: function(){
            return this.url;
        },

        getQuery: function(){},

        parse: function(response){
            return response;
        },

        isLoaded: function(){
            return !!this._isLoaded;
        },

        fetch: function(){
            if (this.xhr) {
                this.xhr.abort();
            }
            this.xhr = Backbone.Collection.prototype.fetch.apply(this, arguments);
        }
    });
});

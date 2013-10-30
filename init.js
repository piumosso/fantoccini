require.config({
    baseUrl: '/js'
});


require([
    'jquery',
    'underscore',
    'marionette',
    'jquery.cookie',
    'app/App'
], function (
    $,
    _,
    Marionette,
    jqueryCookie,
    App
) {
    if (!jade) {
        throw new Error('jade is not defined');
    }

    var initTemplates = function(){
        Marionette.TemplateCache.get = function(templateName){
            var that = this,
                df = new $.Deferred(),
                cachedTemplate = this.templateCaches[templateName];

            if (cachedTemplate) {
                df.resolve(cachedTemplate);
            } else {
                require(['text!' + templateName], function(templateText){
                    cachedTemplate = jade.compile(templateText);
                    that.templateCaches[templateName] = cachedTemplate;
                    df.resolve(cachedTemplate);
                });
            }

            return df;
        };
        Marionette.Renderer.render = function(template, data){
            var df = new $.Deferred();

            Marionette.TemplateCache.get(template).then(function(cachedTemplate){
                df.resolve(cachedTemplate(data));
            });

            return df;
        };
        Marionette.ItemView.prototype.render = function(){
            this.isClosed = false;

            this.triggerMethod('before:render', this);
            this.triggerMethod('item:before:render', this);

            var data = this.serializeData();
            data = this.mixinTemplateHelpers(data);

            var template = this.getTemplate();
            var htmlDf = Marionette.Renderer.render(template, data);

            htmlDf.then(_.bind(function(html){
                this.$el.html(html);
                this._isRendered = true;

                this.bindUIElements();

                this.triggerMethod('render', this);
                this.triggerMethod('item:rendered', this);
            }, this));

            return this;
        };
        Marionette.CompositeView.prototype.render = function(){
            this.isClosed = false;
            this.resetItemViewContainer();

            this.triggerBeforeRender();
            var htmlDf = this.renderModel();
            htmlDf.done(_.bind(function(html){
                this.$el.html(html);
                this.isRendered = true;

                // Удаляем закешированный элемент для вставки дочерних
                delete this.$itemViewContainer;

                // the ui bindings is done here and not at the end of render since they
                // will not be available until after the model is rendered, but should be
                // available before the collection is rendered.
                this.bindUIElements();
                this.triggerMethod("composite:model:rendered");

                this._renderChildren();

                this.triggerMethod("composite:rendered");
                this.triggerRendered();
            }, this));

            return this;
        };
        Marionette.CompositeView.prototype.appendHtml = function(cv, iv, index){
            // Обрабатываем асинхронный рендеринг шаблона
            try {
                var $container = this.getItemViewContainer(cv);
                $container.append(iv.el);
            } catch (e) {}
        };
        Marionette.Layout.prototype.ready = function(callback){
            if (this._isRendered) {
                callback.call(this);
            } else {
                this.once('render', _.bind(function(){
                    callback.call(this);
                }, this))
            }
        };
    };

    var initCsrf = function(){
        $(function(){
            $(document).ajaxSend(function(event, xhr, settings) {
                function safeMethod(method) {
                    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
                }

                if (!safeMethod(settings.type)) {
                    xhr.setRequestHeader("X-CSRFToken", $.cookie('csrftoken'));
                }
            });
        });
    };

    // Инициализация
    initTemplates();
    initCsrf();

    // Приложение
    $.when(App.isReady).then(function(){
        $('.js-welcome-loader').remove();
        App.start();
    });
});

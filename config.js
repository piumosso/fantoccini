require.config({
    paths: {
        'backbone': 'libs/backbone',
        'underscore': 'libs/underscore.string',
        'underscore.string': 'libs/underscore',
        'jquery': 'libs/jquery',
        'marionette': 'libs/backbone.marionette',
        'backbone.wreqr': 'libs/backbone.wreqr',
        'backbone.babysitter': 'libs/backbone.babysitter',
        'backbone.routefilter': 'libs/backbone.routefilter',
        'text': 'libs/require.text',
        'plate': 'libs/plate',
        'moment': 'libs/moment',
        'raphael': 'libs/raphael',
        'russianMoment': 'libs/moment.ru',
        'datepicker': 'libs/ui/i18n/jquery.ui.datepicker-ru',
        'highcharts': 'libs/highcharts',
        'jquery.form': 'libs/jquery.form',
        'jquery.cookie': 'libs/jquery.cookie'
    },
    shim: {
        'jquery': {
            exports: 'jQuery'
        },
        'underscore': {
            deps: ['underscore.string'],
            exports: '_'
        },
        'backbone': {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },
        'marionette': {
            deps: ['jquery', 'underscore', 'backbone'],
            exports: 'Marionette'
        },
        'datepicker': {
            deps: [
                'jquery',
                'libs/ui/jquery.ui.core',
                'libs/ui/jquery.ui.datepicker'
            ]
        },
        'jquery.form': {
            deps: ['jquery']
        },
        'jquery.cookie': {
            deps: ['jquery']
        }
    },
    waitSeconds: 60
});

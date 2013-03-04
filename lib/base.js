(function() {
  var defaultConfig = {
    require: {
      paths: {
        underscore: 'components/underscore/underscore',
        jquery:     'components/jquery/jquery'
      },
      shim: {
        underscore: { exports: '_' },
        jquery:     { exports: '$' }
      }
    }
  };

  require.config(defaultConfig.require);

  if (window.jQuery) {
    define('jquery', [], function () {
      return window.jQuery;
    });
  }

  define(['module', 'underscore', 'jquery', './base/dom', './base/data', './platform'], function(module, _, $, dom, data) {
    var console = window.console || {};

    // Auto configure aura path... if not set yet...
    if (!require.s.contexts._.config.paths.aura) {
      require.config({ paths: { aura: module.id.replace(/base$/, '') }});
    }

    var base = {
      dom: dom,
      data: data
    };

    base.util = {
      each: $.each,
      extend: $.extend,
      uniq: _.uniq,
      _: _,
      decamelize: function(camelCase, delimiter) {
        delimiter = (delimiter === undefined) ? '_' : delimiter;
        return camelCase.replace(/([A-Z])/g, delimiter + '$1').toLowerCase();
      }
    };

    var noop = function() {};

    base.log = function() {
      return console.log && console.log(arguments);
    };
    // base.warn = console.warn || noop;
    // base.error = console.error || noop;

    base.events = {
      listen: function(context, events, selector, callback) {
        return $(context).on(events, selector, callback);
      },
      bindAll: function() {
        return _.bindAll.apply(this, arguments);
      }
    };


    base.template = {
      parse: _.template
    };

    return base;

  });

})();

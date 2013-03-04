define(['jquery'], function($) {

  return {
    find: function(selector, context) {
      context = context || document;
      return $(context).find(selector);
    },
    data: function(selector, attribute) {
      return $(selector).data(attribute);
    }
  }
});

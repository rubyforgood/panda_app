var m = require('mithril')

var Hello = {
  controller: function() {
    return { name: 'World' };
  },

  view: function(ctrl) {
    return m('h1', {}, ("Hello " + ctrl.name));
  }
}

m.mount(document.getElementById('main'), Hello);

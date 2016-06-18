var mithril = require('mithril');

var apps = {
  SchemeList: require('./components/scheme/scheme_list'),
  ObservationForm: require('./components/observation_form'),
};

var element = document.querySelector('[data-mithril-component]');
var app = apps[element.getAttribute('data-mithril-component')];

window.SchemeRepository = require('./repositories/scheme_repository');

mithril.route.mode = "hash";
mithril.route(element, '/', app.routes);

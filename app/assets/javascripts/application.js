var mithril = require('mithril');

var apps = {
  SchemeCreationForm: require('./components/scheme_creation_form'),
  ObservationForm:    require('./components/observation_form'),
};

var element = document.querySelector('[data-mithril-component]');

var app = apps[element.getAttribute('data-mithril-component')];
mithril.route(element, '/', app.routes);

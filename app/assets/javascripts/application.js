var mithril = require('mithril');

var components = {
  SchemeCreationForm: require('./components/scheme_creation_form')
};

var element = document.querySelector('[data-mithril-component]');

mithril.mount(element, components[element.getAttribute('data-mithril-component')]);

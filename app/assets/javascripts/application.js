var m = require('mithril');

var components = {
  SchemeCreationForm: require('./components/scheme_creation_form')
};

document.querySelectorAll('[data-mithril-component]').forEach((element) => {
  m.mount(element, components[element.getAttribute('data-mithril-component')]);
});

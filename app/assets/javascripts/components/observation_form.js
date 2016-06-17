const m = require('mithril');

const FocusAnimal = {
  controller: function() {
    return {
    };
  },

  view: function(ctrl) {
  },
};

const ObservationForm = {
  controller: function() {
    return {
    };
  },

  view: function(ctrl) {
    return (
      <div>
        <h1>
          <a href="/">Red Pandas</a>
        </h1>
      </div>
    );
  },
};

module.exports = {
  routes: {
    "/": ObservationForm,
    "/observe": ObservationForm,
    "/observe/focus_animal": FocusAnimal,
  },
}

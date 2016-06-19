const SchemeRepository = require('./../../repositories/scheme_repository');

const SchemeList = {
  controller: function () {
    this.remove = function (index) {
      this.schemes.splice(index, 1)
    };

    return {
      schemes: SchemeRepository.all()
    };
  },

  view: function (ctrl) {
    return <div class="box">
      <h1 class="context-marker">Schemes</h1>
      <p class="list-control"><a class="button button-add" href="#/new">+ Add Scheme</a></p>
      {ctrl.schemes.map((scheme, index) => {
        return <div class={`control-group scheme_${index}`}>
          <button onclick={() => ctrl.remove(index) }>-</button>
          {scheme.name}
          <button>edit</button>
        </div>
      })}
    </div>;
  }
};

const SchemeCreationForm = require('./scheme_form');

module.exports = {
  routes: {
    "/": SchemeList,
    "/new": SchemeCreationForm
  }
};

const SchemeList = {
  controller: function () {
    this.remove = function (index) {
      this.schemes.splice(index, 1)
    };

    return {
      // TODO: add API GET call
      schemes: [
        { name: 'name1' },
        { name: 'name2' },
        { name: 'name3' }
      ]
    };
  },

  view: function (ctrl) {
    return <div>
      <h1>Schemes <a href="#/new">+</a></h1>
      {ctrl.schemes.map((scheme, index) => {
        return (
          <div class={`control-group scheme_${index}`}>
            <button onclick="function(){ ctrl.remove(index) }">-</button>
            {scheme.name}
            <button>edit</button>
          </div>
        )
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

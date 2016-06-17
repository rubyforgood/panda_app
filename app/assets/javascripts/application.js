var m = require('mithril');

var Hello = {
  controller: function() {
    return { name: 'Earth', populace: ['Betsy', 'Julie', 'Nate'] };
  },

  view: function(ctrl) {
    return <div>
      <h1>{`Hello ${ctrl.name}`}</h1>
      {ctrl.populace.map((person) => {
        return <p>{person}</p>;
      })}
    </div>;
  }
}

m.mount(document.getElementById('main'), Hello);

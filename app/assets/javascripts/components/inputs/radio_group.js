var m = require('mithril');

const RadioGroup = {
  controller: function (args) {
    return {
      namespace: args.namespace,
      item: args.item,
      attribute: args.attribute,
      text: args.text,
      collection: args.collection, // [['Label','key'],['State','state']]
      index: args.index,
      id: function(value) {
        return `${this.namespace}_${this.item}_${ this.index }_${this.attribute}_${value}`
      },
      name: function() {
        return `${this.namespace}[${this.item}][${ this.index }][${this.attribute}]`
      },
      checked: args.checked || false, // must be provided: function(key){ return somestate == key }
      update: args.update || function() {} // of form function(value) { return ctrl.key = value }
    }
  },
  view: function (ctrl) {
    var options = ctrl.collection.map(function(pair){
      return <label class="option" for={ctrl.id(pair[1])}>
        <input
          type="radio"
          id={ctrl.id(pair[1])}
          name={ctrl.name()}
          value={pair[1]}
          checked={ctrl.checked(pair[1])}
          onchange={(e)=> { if(e.target.checked) { ctrl.update(e.target.value) }}}
        />
          {pair[0]}
      </label>
    });

    return <div class="control-group">
        <label>{ctrl.text}</label>
        {options}
      </div>
  }
};

module.exports = RadioGroup;

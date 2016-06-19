var m = require('mithril');

const TextField = {
  controller: function (args) {
    return {
      target: args.target,
      labelText: args.labelText,
      namespace: args.namespace,
      item: args.item,
      index: args.index,
      attribute: args.attribute,
      id: function() {
        return `${this.namespace}_${this.item}_${this.index}`
      },
      name: function() {
        return `${this.namespace}[${this.item}][${this.attribute}]`
      }
    }
  },
  view: function (ctrl) {
    return <div class="field">
      <label for="scheme_subject_group_name">
        {ctrl.labelText}
      </label>
      <input
        type="text"
        class="field_entry"
        id={ctrl.id()}
        name={ctrl.name()}
        value={ctrl.target.name}
        oninput={(e)=> { ctrl.target.name = e.target.value }}
      />
    </div>;
  }
};

module.exports = TextField;

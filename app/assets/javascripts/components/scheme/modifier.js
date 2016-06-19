var m = require('mithril');
const EditableItem = require('./editable_item.js');
const TextField = require('../inputs/text_field');

const Modifier = {
  controller: function (args) {
    return {
      modifiers: args.modifiers
    }
  },
  view: function (ctrl) {
    return <div class="subject_group">
      {ctrl.modifiers.map((modifier, index) => {
        if (modifier.editing) {
          return m.component(TextField, {
            target: modifier,
            labelText: 'Name: ',
            namespace: 'scheme',
            item: 'modifier',
            index: index,
            attribute: 'name'
          })
        } else {
          return m.component(EditableItem, {
            namespace: 'scheme',
            item: 'subject_group',
            index: index,
            text: modifier.name
          })
        }
      })}
    </div>;
  }
};

module.exports = Modifier;

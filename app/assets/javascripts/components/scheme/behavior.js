const m = require('mithril');
const EditableItem = require('./editable_item.js');

const Behavior = {
  controller: function (args) {
    return {
      behavior: args.behavior,
      modifiers: args.modifiers,
      index: args.index,
      parentBehaviors: args.parentBehaviors
    }
  },
  view: function (ctrl) {
    var text = `Type: ${ctrl.behavior.type} - ME: ${ctrl.behavior.mutually_exclusive} - Target: ${ctrl.behavior.target}`;
    return <div class="behavior">
    <EditableItem
      namespace={ctrl.behavior.type}
      item={ctrl.behavior.name}
      index={ctrl.index}
      text={ctrl.behavior.name} />
      <span>{text}</span>
      <span>{ctrl.parentBehaviors.join(' - ')}</span>
    </div>
  }
};

module.exports = Behavior;

const m = require('mithril')
const EditableItem = require('./editable_item.js')

const Behavior = {
  controller: function (args) {
    return {
      behavior: args.behavior,
      index: args.index
    }
  },
  view: function (ctrl) {
    var text = `Type: ${ctrl.behavior.type} - ME: ${ctrl.behavior.mutually_exclusive} - Target: ${ctrl.behavior.target}`
    return <EditableItem
      namespace={ctrl.behavior.type}
      item={ctrl.behavior.name}
      index={ctrl.index}
      text={text} />
  }
};

module.exports = Behavior;

const EditableItem = {
  controller: function (args) {
    return {
      namespace: args.namespace,
      item: args.item,
      text: args.text,
      index: args.index
    }
  },
  view: function (ctrl) {
    return <div class={`control-group ${ctrl.namespace}_${ctrl.item}_${ctrl.index}`}>
      <a><span>{ ctrl.text }</span></a>
      <a class='button button-remove destructive'>-</a>
    </div>
  }
};

module.exports = EditableItem;

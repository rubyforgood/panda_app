const m = require('mithril')
const EditableItem = require('./editable_item.js')
const Subject = {
  controller: function (args) {
    return {
      subject: args.subject,
      index: args.index
    }
  },
  view: function (ctrl) {
    return <EditableItem namespace='scheme' item='subject' index={ctrl.index} text={ctrl.subject}/>
    return <div class={`control-group scheme_subject_${ctrl.index}`}>
      <a><span>{ ctrl.subject }</span></a>
      <a class='button button-remove destructive'>-</a>
    </div>
  }
};

module.exports = Subject;

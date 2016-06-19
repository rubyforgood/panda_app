const m = require('mithril');
const EditableItem = require('./editable_item.js');

const Subject = {
  controller: function (args) {
    return {
      subject: args.subject,
      index: args.index
    }
  },
  view: function (ctrl) {
    return <div>
      <EditableItem namespace="scheme" item="subject" index={ctrl.index} text={ctrl.subject.name}/>
      <ul class="associations">
        {ctrl.subject.groups.map((group) => {
          return <li>{group.name}</li>
        })};
      </ul>
    </div>;
  }
};

module.exports = Subject;

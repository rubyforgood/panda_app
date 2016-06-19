var m = require('mithril');
const EditableItem = require('./editable_item.js');
const TextField = require('../inputs/text_field');

const SubjectGroup = {
  controller: function (args) {
    return {
      subjectGroups: args.subjectGroups
    }
  },
  view: function (ctrl) {
    return <div class="subject_group">
      {ctrl.subjectGroups.map((group, index) => {
        if (group.editing) {
          return m.component(TextField, {
            target: group,
            labelText: 'Name: ',
            namespace: 'scheme',
            item: 'subject_group',
            index: index,
            attribute: 'name'
          })
        } else {
          return m.component(EditableItem, {
            namespace: 'scheme',
            item: 'subject_group',
            index: index,
            text: group.name
          })
        }
      })}
    </div>;
  }
};

module.exports = SubjectGroup;

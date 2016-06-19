var m = require('mithril');
const CheckboxGroup = require('../inputs/checkbox_group.js');

const SubjectForm = {
  controller: function (args) {
    return {
      subject: args.subject,
      index: args.index,
      subjectGroups: args.subjectGroups
    }
  },
  view: function (ctrl) {
    return <div class="field">
      <label for="scheme_subject">
        Name:
      </label>
      < input
        type="text"
        class="field_entry"
        id="scheme_subject"
        name="scheme[subject][name]"
        value={ctrl.subject.name}
        onchange={(e)=> { ctrl.subject.name = e.target.value }}
      />
      <CheckboxGroup
        divText="Groups: "
        collection={ctrl.subjectGroups}
        associations={ctrl.subject.groups}
        namespace="scheme"
        item="subject_group"
        attribute="name"
      />
    </div>
  }
};

module.exports = SubjectForm;

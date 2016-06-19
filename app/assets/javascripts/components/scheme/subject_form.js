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
      <div class="control-group">
        Groups:
        {ctrl.subjectGroups.map((group, index) => {
          return <label>
            <input
              type="checkbox"
              value={group.name}
              id={`scheme_subject_group_${index}`}
              name="scheme[subject_group][name]"
              checked={ctrl.subject.groups.includes(group)}
            />
            {group.name}
          </label>
        })}
      </div>
    </div>
  }
};

module.exports = SubjectForm;

const SubjectForm = {
  controller: function (args) {
    return {
      subject: args.subject,
      index: args.index,
      subjectGroups: args.subjectGroups
    }
  },
  view: function (ctrl) {
    return <div class="control-group">
      <label for="scheme_subject">
        Name:
      </label>
      < input
        type="text"
        id="scheme_subject"
        name="scheme[subject][name]"
        value={ctrl.subject.name}
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
      <button>save</button>
    </div>
  }
};

module.exports = SubjectForm;

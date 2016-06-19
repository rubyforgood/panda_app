const SubjectGroupForm = {
  controller: function (args) {
    return {
      subjectGroup: args.subjectGroup,
      index: args.index
    }
  },
  view: function (ctrl) {
    return <div class="field">
      <label for="scheme_subject_group_name">
        Name:
      </label>
      <input
        type="text"
        class="field_entry"
        id="scheme_subject_group_name"
        name="scheme[subject_group][name]"
        value={ctrl.subjectGroup.name}
      />
    </div>;
  }
};

module.exports = SubjectGroupForm;

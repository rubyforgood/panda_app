const SubjectGroupForm = {
  controller: function (args) {
    return {
      subject: args.subject,
      index: args.index
    }
  },
  view: function (ctrl) {
    return <div class="control-group">
      <label for="scheme_subject_group_name">
        Name:
      </label>
      <input
        type="text"
        id="scheme_subject_group_name"
        name="scheme[subject_group][name]"
        value={ctrl.subject.name}
      />
      <button>save</button>
    </div>;
  }
};

module.exports = SubjectGroupForm;

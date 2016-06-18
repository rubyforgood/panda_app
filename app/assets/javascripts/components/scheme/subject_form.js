const SubjectForm = {
  controller: function (args) {
    return {
      // change to args.subject || new Subject() when model created
      // TODO: how to account for subject groups?
      subject: args.subject
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
        name="scheme[subject]"
        value={ctrl.subject.name}
        onchange={(e)=> { ctrl.subject.name = e.target.value }}
      />
      <button>save</button>
    </div>
  }
};

module.exports = SubjectForm;

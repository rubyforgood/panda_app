const Subject = {
  controller: function (args) {
    return {
      subject: args.subject,
      index: args.index
    }
  },
  view: function (ctrl) {
    return <div class={`control-group scheme_subject_${ctrl.index}`}>
      <button>-</button>
      <span>{ ctrl.subject }</span>
      <button style="float: right;">edit</button>
    </div>
  }
};

module.exports = Subject;

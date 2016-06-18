const Subject = {
  controller: function (args) {
    return {
      subject: args.subject,
      index: args.index
    }
  },
  view: function (ctrl) {
    return <div class={`control-group scheme_subject_${ctrl.index}`}>
      <a><span>{ ctrl.subject }</span></a>
      <a class='button button-remove destructive'>-</a>
    </div>
  }
};

module.exports = Subject;

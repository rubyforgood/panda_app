const Subject = {
  controller: function (args) {
    return {
      subject: args.subject,
      index: args.index
    }
  },
  view: function (ctrl) {
    return <div class={`control-group scheme_subject_${ctrl.index}`}>
      <a class="button button-remove">-</a>
      <span>{ ctrl.subject }</span>
      <a class="button button-edit" style="float: right;">edit</a>
    </div>
  }
};

module.exports = Subject;

module.exports = {
  controller: function(opts, children) {
    return { 
      opts,
      children,
    };
  },

  view: function(ctrl) {
    return (
      <a href={ctrl.opts.href} class="button button-nav">{ctrl.children}</a>
    );
  },
};

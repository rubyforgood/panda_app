const Scheme = function(params) {
  params = params || {};
  this.name      = params.name || "";
  this.locked    = params.locked || false;
  this.subjects  = [];
  this.behaviors = [];
}

module.exports = Scheme;

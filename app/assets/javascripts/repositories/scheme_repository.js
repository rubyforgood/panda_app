const Scheme = require('./../models/scheme');

const SchemeRepository = {
  all: function() {
    return [
      new Scheme()
    ];
  },

  get: function(uuid) {
    return new Scheme({uuid: uuid});
  },

  save: function(scheme) {
    return scheme;
  }
}

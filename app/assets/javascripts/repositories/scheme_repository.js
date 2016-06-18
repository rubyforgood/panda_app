const Scheme = require('./../models/scheme');

const SchemeRepository = {
  all: function() {
    return SchemeRepository.cache.values();
  },

  get: function(uuid) {
    return SchemeRepository.cache[uuid] || new Scheme({uuid: uuid});
  },

  save: function(uuid) {
    return SchemeRepository.cache[uuid];
  },

  new: function(params) {
    var scheme = new Scheme(params);
    scheme.addBlankSubject();
    scheme.addBlankBehavior();
    SchemeRepository.cache[scheme.uuid] = scheme;
    return scheme;
  },

  cache: {}
}

const Scheme = require('./../models/scheme');
Object.values = function(obj) {
  var collect = [];
  for (k in obj) {
    if (obj.hasOwnProperty(k)) {
      collect.push(obj[k]);
    }
  }
  return collect;
};

const SchemeRepository = {
  all: function() {
    return Object.values(SchemeRepository.cache);
  },

  get: function(uuid) {
    return SchemeRepository.cache[uuid] || new Scheme({uuid: uuid});
  },

  save: function(uuid) {
    return SchemeRepository.cache[uuid];
  },

  new: function(params) {
    var scheme = new Scheme(params);
    scheme.addSubject();
    scheme.addBehavior();
    SchemeRepository.cache[scheme.uuid] = scheme;
    return scheme;
  },

  cache: {}
};

module.exports = SchemeRepository;

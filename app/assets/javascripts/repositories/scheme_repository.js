const mithril = require('mithril');

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
    // if undefined, kick off a fetch, return a blank,
    // and trust that mithril will catch us up when the fetch completes
    if(!SchemeRepository.cache[uuid]) {
      SchemeRepository.fetch(uuid);
      return new Scheme({uuid: uuid})
    }
    return SchemeRepository.cache[uuid];
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

  fetch: function(uuid) {
    // throw something in the cache to prevent re-fetches
    SchemeRepository.cache[uuid] = new Scheme({uuid: uuid});
    mithril.request({method: 'GET', url: `/api/schemes/${uuid}.json`}).then(function(data) {
      SchemeRepository.cache[data.uuid] = new Scheme(data);
    });
  },

  cache: {}
};

module.exports = SchemeRepository;

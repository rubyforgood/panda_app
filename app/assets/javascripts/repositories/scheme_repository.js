const mithril = require('mithril');

const Scheme = require('./../models/scheme');

if(!Object.values) {
  Object.values = function(obj) {
    var collect = [];
    for (var k in obj) {
      if (obj.hasOwnProperty(k)) {
        collect.push(obj[k]);
      }
    }
    return collect;
  };
}

const SchemeRepository = {
  all: function() {
    if( !SchemeRepository.fetchAllCalledAlready ) {
      SchemeRepository.fetchAll();
    }
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

  save: function(scheme) {
    scheme.ensureUuids();
    console.log(serialize(scheme));
    SchemeRepository.savingCache[scheme.uuid] = true;

    return mithril.request({
      method: 'POST',
      url: `/api/schemes.json`,
      data: serialize(scheme)
    }).then(success, failure);

    function serialize(scheme) {
      return {
        scheme: {
          id:     scheme.uuid,
          name:   scheme.name,
          locked: scheme.locked,
          behaviors_attributes: scheme.behaviors.map((behavior) => {
            return {
              id: behavior.uuid,
              name: behavior.name,
              type: behavior.type,
              target_type: behavior.target,
              mutually_exclusive: behavior.mutually_exclusive
            }
          }),
          subjects_attributes: scheme.subjects.map((subject) => {
            return {
              id: subject.uuid,
              name: subject.name,
              groups: subject.groups
            }
          })
        }
      };
    }

    function success() {
      SchemeRepository.savingCache[scheme.uuid] = false;
      SchemeRepository.savedCache[scheme.uuid] = true;
    }

    function failure() {

    }
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
    mithril.request({method: 'GET', url: `/api/schemes/${uuid}.json`, type: Scheme}).then(function(scheme) {
      SchemeRepository.cache[scheme.uuid] = scheme;
    });
  },

  fetchAll: function(uuid) {
    SchemeRepository.fetchAllCalledAlready = true;
    mithril.request({
      method: 'GET',
      url: '/api/schemes.json'
    }).then(function(data) {
      data.schemes.forEach((datum) => {
        var scheme = new Scheme(datum);
        SchemeRepository.cache[scheme.uuid] = scheme;
      })
    });
  },

  saving: function(uuid) {
    return SchemeRepository.savingCache[uuid];
  },

  saved: function(uuid) {
    return SchemeRepository.savedCache[uuid];
  },

  cache: {},
  savingCache: {},
  savedCache: {}
};

module.exports = SchemeRepository;

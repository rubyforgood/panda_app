const uuid = require('node-uuid');

let cache = {};

const ObservationRepository = {
  all () {
    return Object.values(cache);
  },

  unsaved () {
    this.all().filter((observation) => observation.is_persisted)
  },

  get (uuid) {
    return cache[uuid];
  },

  add (observation) {
    let uuid = observation.uuid || uuid.v1();

    cache[uuid] = observation;
  },

  save (uuid) {
    return cache[uuid];
  },

  persist () {
    const unsaved = this.unsaved();

    const on_success = (response) => {
      unsaved.forEach(observation => observation.is_persisted = true)
    };

    const on_fail = (response) => {
      // Keep trying to save until it goes through.
      setTimeout(1000, this.persist.bind(this));
    };

    fetch('/api/observations', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(unsaved),
    }).then(on_success, on_fail);
  },
};

module.exports = ObservationRepository;

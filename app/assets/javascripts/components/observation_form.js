const m = require('mithril');

const NavLink = require('./nav_link');

const FocusAnimal = {
  controller: function() {
    return {
      stage_observation: function() {
        this.staged_observations.push(this.new_observation);
        this.new_observation = {
          actor: this.new_observation.actor,
        };
      },
      subjects: [
        { id: 1, name: 'Jamie' },
        { id: 2, name: 'Jim' },
        { id: 3, name: 'Thomas' },
        { id: 4, name: 'Julie' },
        { id: 5, name: 'Betsy' },
        { id: 6, name: 'Christina' },
        { id: 7, name: 'Andrew' },
        { id: 8, name: 'Ryan' },
      ],
      behaviors: [
        {
          id: 1,
          name: 'Running',
          type: 'state',
          mutually_exclusive: true,
          available_modifiers: ['fast', 'slow'],
        },
        {
          id: 2,
          name: 'Grooming',
          type: 'state',
          mutually_exclusive: true,
          target: 'target',
        },
        {
          id: 3,
          name: 'Eating',
          type: 'state',
          mutually_exclusive: true,
          available_modifiers: ['quietly', 'ravenously']
        },
      ],
      observations: [],
      staged_observations: [],
      sessions: [],
      new_observation: {},
      current_session: {},
      current_actor: {},
    };
  },

  view: function(ctrl) {
    return (
      <div class="box">
        <h1 class="context_marker">Focus Animal</h1>
        {this.select_actor(ctrl)}
        {this.content(ctrl)}
      </div>
    );
  },

  select_actor: function(ctrl) {
    const actor = ctrl.new_observation.actor;

    if(actor) {
      return <div>Actor: {actor.name}</div>;
    }

    return(
      <div>
        <p>Select an actor</p>
        {ctrl.subjects.map(subject => {
          if(ctrl.new_observation.actor === subject) {
            return <span> {subject.name} </span>;
          } else {
            return(
              <button onclick={() => ctrl.new_observation.actor = subject}>
                {subject.name}
              </button>
            );
          }
        })}
      </div>
    );
  },

  select_behavior: function(ctrl) {
    const observation = ctrl.new_observation;

    return(
      <div>
        <header>
          <h2>Select Behavior</h2>
        </header>
        {ctrl.behaviors.map(behavior => {
          return(
            <button onclick={() => observation.behavior = behavior}>
              {behavior.name}
            </button>
          );
        })}
      </div>
    );
  },

  select_target: function(ctrl) {
    const observation = ctrl.new_observation;

    return(
      <div>
        <header>
          <h2>Select target</h2>
        </header>
        {ctrl.subjects.map(subject => {
          return(
            <button onclick={() => ctrl.new_observation.target = subject}>
              {subject.name}
            </button>
          );
        })}
      </div>
    );
  },

  content: function(ctrl) {
    const observation = ctrl.new_observation;

    if(!observation.actor) {
      return null;
    }

    if(!observation.behavior) {
      return this.select_behavior(ctrl);
    } else if(observation.behavior.target === 'target' && !observation.target) {
      return this.select_target(ctrl);
    } else {
      if(typeof observation.modifiers === 'undefined') {
        observation.modifiers = [];
      }

      const leftover_modifiers = observation.behavior.available_modifiers.filter(mod => {
        return !observation.modifiers.includes(mod);
      });

      return(
        <div>
          {
            leftover_modifiers.map(modifier => {
              return(
                <button onclick={() => observation.modifiers.push(modifier)}>
                  {modifier}
                </button>
              );
            })
          }
          <div>
            <button onclick={() => ctrl.stage_observation()}>
              New Observation
            </button>
          </div>
        </div>
      );
    }
  },
};

const ObservationForm = {
  controller: function() {
    return {
    };
  },

  view: function(ctrl) {
    return (
      <div class="box">
        <h1 class="context_marker">
          <a href="#/">Red Pandas</a>
        </h1>
        <nav>
          <NavLink href="#/observe/focus_animal">Focus Animal</NavLink>
        </nav>
      </div>
    );
  },
};

module.exports = {
  routes: {
    "/": ObservationForm,
    "/observe": ObservationForm,
    "/observe/focus_animal": FocusAnimal,
  },
}

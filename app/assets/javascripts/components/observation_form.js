const m = require('mithril');
const uuid = require('node-uuid');

const NavLink = require('./nav_link');
const Scheme = require('../models/scheme');
const ObservationRepository = require('../repositories/observation_repository');

const NewObservationLink = {
  view: function(){
    return <h1 class="context-marker"><a href="#">&#8592; New Observation</a></h1>
  }
}

let scheme = new Scheme({
  name: 'Foo',
  locked: true,
});

scheme.subjects = [
  { id: 1, name: 'Jamie' },
  { id: 2, name: 'Jim' },
  { id: 3, name: 'Thomas' },
  { id: 4, name: 'Julie' },
  { id: 5, name: 'Betsy' },
  { id: 6, name: 'Christina' },
  { id: 7, name: 'Andrew' },
  { id: 8, name: 'Ryan' },
]
scheme.behaviors = [
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
    available_modifiers: [],
  },
  {
    id: 3,
    name: 'Eating',
    type: 'state',
    mutually_exclusive: true,
    available_modifiers: ['quietly', 'ravenously']
  },
];

let staged_observations = [];
let new_observation = {};
let session_id = uuid.v1();

const FocusAnimal = {
  controller: function() {
    return {
      subjects: scheme.subjects,
      behaviors: scheme.behaviors,

      stage_observation: function() {
        staged_observations.push(new_observation);
        new_observation = {
          actor: new_observation.actor,
        };
      },

      complete_session: function() {
        if(new_observation.behavior) {
          this.stage_observation();
        }

        if(typeof this.saving_observations === 'undefined') {
          this.saving_observations = [];
        }

        this.saving_observations = this.saving_observations.concat(staged_observations);
        staged_observations = [];
        new_observation = {};
      },
    };
  },

  view: function(ctrl) {
    return (
      <div class="box">
        <h1 class="context-marker"><NewObservationLink /></h1>
        <p>Staged observations: {staged_observations.length}</p>
        {this.select_actor(ctrl)}
        {this.content(ctrl)}
        <div class="actions">
          <button class="button button-commit" onclick={() => ctrl.complete_session()}>
            Complete Session
          </button>
        </div>
      </div>
    );
  },

  select_actor: function(ctrl) {
    const actor = new_observation.actor;

    if(actor) {
      return <h2 class="context-marker">Subject: {actor.name}</h2>;
    }

    return(
      <fieldset class="box box-event">
        <legend class="observation-legend">Select a subject</legend>
        {scheme.subjects.map(subject => {
          if(new_observation.actor === subject) {
            return <span> {subject.name} </span>;
          } else {
            return(
              <button class="button" onclick={ () => new_observation.actor = subject }>
                {subject.name}
              </button>
            );
          }
        })}
      </fieldset>
    );
  },

  select_behavior: function(ctrl) {
    return(
      <fieldset class="box box-event">
        <legend class="observation-legend">Select Behavior</legend>
        {ctrl.behaviors.map(behavior => {
          return(
            <button class="button" onclick={() => new_observation.behavior = behavior}>
              {behavior.name}
            </button>
          );
        })}
      </fieldset>
    );
  },

  select_target: function(ctrl) {
    return(
      <fieldset class="box box-event">
        <legend class="observation-legend">Select target</legend>
        {scheme.subjects.map(subject => {
          return(
            <button class="button" onclick={() => new_observation.target = subject}>
              {subject.name}
            </button>
          );
        })}
      </fieldset>
    );
  },

  content: function(ctrl) {
    if(!new_observation.actor) {
      return null;
    }

    if(!new_observation.behavior) {
      return this.select_behavior(ctrl);
    } else if(new_observation.behavior.target === 'target' && !new_observation.target) {
      return this.select_target(ctrl);
    } else {
      if(typeof new_observation.modifiers === 'undefined') {
        new_observation.modifiers = [];
      }

      const leftover_modifiers = new_observation.behavior.available_modifiers.filter(mod => {
        return !new_observation.modifiers.includes(mod);
      });

      return(
        <div>
          <fieldset class="box box-event">
            <legend class="observation-legend">Modifier</legend>
          {
            leftover_modifiers.map(modifier => {
              return(
                <button class="button" onclick={() => new_observation.modifiers.push(modifier)}>
                  {modifier}
                </button>
              );
            })
          }
          </fieldset>
          <div class="box">
            <button class="button button-add" onclick={() => ctrl.stage_observation()}>
              &#8592; New Observation for { new_observation.actor.name }
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
        <h1 class="context-marker">
          <a href="#/">Red Pandas</a>
        </h1>
        <nav>
          <NavLink href="#/focus_animal">Focus Animal</NavLink>
        </nav>
      </div>
    );
  },
};

module.exports = {
  routes: {
    "/": ObservationForm,
    "/focus_animal": FocusAnimal,
  },
}

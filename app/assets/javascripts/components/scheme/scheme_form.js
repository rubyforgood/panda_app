var mithril = require('mithril');
const Behavior = require('./behavior');
const Subject = require('./subject');

const SchemeCreationForm = {
  controller: function() {
    this.add = function(key) {
      // TODO: is there a meta way of doing this?
      // this.scheme[key].push(new key.to_model);
      if (key == 'behaviors') {
        this.scheme.behaviors.push(new Behavior());
        // <BehaviorForm /> append to dom
      } else if (key == 'subjects') {
        this.scheme.subjects.push(new Subject());
        //  <SubjectForm /> append to dom
      }
    };

    return {
      // scheme: new Scheme()
      // TODO: set this to be reused for new or edit
      scheme: {
        name: "an amazing scheme",
        locked: true,
        subjects: ['Bob', 'Mary', 'Sponge'],
        behaviors: [
          {
            name: 'walking',
            type: 'state',
            mutually_exclusive: true,
            target: 'none'
          }
        ]
      }
    };
  },

  view: function (ctrl) {
    return <form>
      <label for="scheme_name">
        Scheme Name
      </label>
      <input
        type="text"
        id="scheme_name"
        name="scheme[name]"
        value={ctrl.scheme.name}
      />
      <div class="control-group">
        <label for="scheme_locked">
          Lock to User
        </label>
        <input
          type="checkbox"
          id="scheme_locked"
          name="scheme[locked]"
          checked={ctrl.scheme.locked}
        />
      </div>
      <fieldset>
        <legend>Subjects
          <button onclick="function(){ this.add('subjects') }">+</button>
        </legend>
        {ctrl.scheme.subjects.map((subject, index) => {
          return mithril.component(Subject, {subject: subject, index: index})
        })}
      </fieldset>
      <fieldset>
        <legend>Behaviors
          <button onclick="function(){ this.add('behaviors') }">+</button>
        </legend>
        {ctrl.scheme.behaviors.map((behavior, index) => {
          return mithril.component(Behavior, {behavior: behavior, index: index})
        })}
      </fieldset>
    </form>;
  }
};

module.exports = SchemeCreationForm;

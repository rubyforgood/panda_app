var mithril = require('mithril');
const Behavior = require('./behavior');
const Subject = require('./subject');

const SchemeCreationForm = {
  controller: function() {
    var s = SchemeRepository.new({
      name: "an amazing scheme",
      locked: true,
      subjects: [{ name: 'Bob', groups: ['males']}],
      subject_groups: [
        {
          name: 'males',
          members: ['Bob'] // how to link this with
        }
      ],
      behaviors: [
        {
          name: 'walking',
          type: 'state',
          mutually_exclusive: true,
          target: 'none',
          editing: false
        }
      ],
      modifiers: [
        {
          name: '',
          associated_behavior: ''
        }
      ]
    });
    return {
      // scheme: new Scheme()
      // TODO: set this to be reused for new or edit
      scheme: SchemeRepository.get(s.uuid)
    };
  },



  view: function (ctrl) {
    return <form class="box">
      <h1 class="context-marker">Create Scheme</h1>
      <p class="field">
      <label for="scheme_name">
        Scheme Name
      </label><br />
      <input
        type="text"
        class="field_entry"
        id="scheme_name"
        name="scheme[name]"
        value={ctrl.scheme.name}
      />
      </p>
      <p class="field">
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
      </p>
      <fieldset class="field">
        <legend>Subjects
          <a class="button button-add" onclick={() => { console.log('clicked'); ctrl.scheme.addBlankSubject() } }>Add</a>
        </legend>
        <a class="button button-add" onclick="function(){ this.add('subjects') }">Add</a>
        {ctrl.scheme.subjects.map((subject, index) => {
          return mithril.component(Subject, {subject: subject, index: index})
        })}
      </fieldset>
      <fieldset class="field">
        <legend>Subject Groups
        </legend>
        <a class="button button-add" onclick="function(){ this.add('subjects') }">Add</a>
        {ctrl.scheme.subjects.map((subject, index) => {
          return mithril.component(Subject, {subject: subject, index: index})
        })}
      </fieldset>
      <fieldset class="field">
        <legend>Subject Groups
          <a class="button button-add" onClick="function(){ this.add('subjects') }">Add</a>
        </legend>
        {ctrl.scheme.subjects.map((subject, index) => {
          return mithril.component(Subject, {subject: subject, index: index})
        })}
      </fieldset>
      <fieldset>
        <legend>Behaviors
          <a class="button button-add" onClick={ctrl.addBehavior}>Add</a>
        </legend>
        <a class="button button-add" onclick="function(){ this.add('behaviors') }">Add</a>
        {ctrl.scheme.behaviors.map((behavior, index) => {
          var component = behavior.editing ? BehaviorForm : Behavior;
          return mithril.component(component, {behavior: behavior, index: index});
        })}
      </fieldset>
    </form>;
  }
};

module.exports = SchemeCreationForm;

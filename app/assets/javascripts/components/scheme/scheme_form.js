var mithril = require('mithril');
const Behavior = require('./behavior');
const BehaviorForm = require('./behavior_form');
const Subject = require('./subject');
const SubjectForm = require('./subject_form');
const SchemeRepository = require('../../repositories/scheme_repository');

const SchemeCreationForm = {
  controller: function() {
    var ctrl = {
      scheme: SchemeRepository.new()
    }
    ctrl.save = function() {
      this.scheme
      SchemeRepository.save(this.scheme);
    }.bind(ctrl);

    return ctrl;
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
        onchange={(e)=> { ctrl.scheme.name = e.target.value }}
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
            onchange={(e)=> { ctrl.scheme.locked = e.target.value }}
          />
        </div>
      </p>
      <fieldset class="field">
        <legend>Subjects
          <a class="button button-add" onclick={() => { ctrl.scheme.addSubject() } }>Add</a>
        </legend>
        {ctrl.scheme.subjects.map((subject, index) => {
          var component = subject.editing ? SubjectForm : Subject;
          return mithril.component(component, {subject: subject, index: index})
        })}
      </fieldset>
      <fieldset class="field">
        <legend>Subject Groups
        </legend>
        <a class="button button-add" onclick={() => ctrl.scheme.addSubjectGroup()}>Add</a>
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
          <a class="button button-add" onclick={() => ctrl.scheme.addBehavior()}>Add</a>
        </legend>
        <a class="button button-add" onclick="function(){ this.add('behaviors') }">Add</a>
        {ctrl.scheme.behaviors.map((behavior, index) => {
          var component = behavior.editing ? BehaviorForm : Behavior;
          return mithril.component(component, {behavior: behavior, index: index});
        })}
      </fieldset>

      <input
        type='submit'
        value='Save'
        onclick={ () => { ctrl.save() } }
      />
    </form>;
  }
};

module.exports = SchemeCreationForm;

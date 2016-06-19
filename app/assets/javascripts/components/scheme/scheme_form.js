var m = require('mithril');
const Behavior = require('./behavior');
const BehaviorForm = require('./behavior_form');
const Modifier = require('./modifier');
const Subject = require('./subject');
const SubjectForm = require('./subject_form');
const SubjectGroup = require('./subject_group');
const SchemeRepository = require('../../repositories/scheme_repository');

const SchemeCreationForm = {
  controller: function() {
    var ctrl = {
      scheme: SchemeRepository.new()
    };
    ctrl.save = function() {
      SchemeRepository.save(this.scheme);
    };
    ctrl.parentBehaviors = function () {
      this.scheme.behaviors.filter(function (behavior) {
        if (behavior.parent && behavior.parent.length > 0) {
          return behavior
        }
      });
    }.bind(ctrl);
    ctrl.saving = function() {
      return SchemeRepository.saving(this.scheme.uuid);
    }.bind(ctrl);
    ctrl.saved = function() {
      return SchemeRepository.saved(this.scheme.uuid);
    }.bind(ctrl);

    return ctrl;
  },

  view: function (ctrl) {
    return <form class="box">
      <h1 class="context-marker">Create Scheme</h1>
      <p class="field">
        <div class="control-group">
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
        </div>
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
            onchange={(e)=> { ctrl.scheme.locked = e.target.checked }}
          />
        </div>
      </p>
      <fieldset class="field">
        <legend>Subject Groups</legend>
        <p class="list-control">
          <a class="button button-add" onclick={() => ctrl.scheme.addSubjectGroup()}>Add</a>
        </p>
        <SubjectGroup
          subjectGroups={ctrl.scheme.subjectGroups}
        />
      </fieldset>
      <fieldset class="field">
        <legend>Subjects</legend>
        <p class="list-control">
          <a class="button button-add" onclick={() => ctrl.scheme.addSubject()}>Add</a>
        </p>
        {ctrl.scheme.subjects.map((subject, index) => {
          var component = subject.editing ? SubjectForm : Subject;
          return m.component(component, {
            subject: subject,
            index: index,
            subjectGroups: ctrl.scheme.subjectGroups
          })
        })}
      </fieldset>
      <fieldset class="field">
        <legend>Modifiers</legend>
        <p class="list-control">
          <a class="button button-add" onclick={() => ctrl.scheme.addModifier()}>Add</a>
        </p>
        <Modifier
          modifiers={ctrl.scheme.modifiers}
        />
      </fieldset>
      <fieldset class="field">
        <legend>Behaviors</legend>
        <p class="list-control">
          <a class="button button-add" onclick={() => ctrl.scheme.addBehavior()}>Add</a>
        </p>
        {ctrl.scheme.behaviors.map((behavior, index) => {
          var component = behavior.editing ? BehaviorForm : Behavior;
          return m.component(component, {
            parentBehaviors: ctrl.parentBehaviors(),
            behavior: behavior,
            modifiers: ctrl.scheme.modifiers,
            index: index
          });
        })}
      </fieldset>

      <div class="actions">
        <input
          type='submit'
          class="button button-commit"
          value='Save'
          onclick={ (e) => { e.preventDefault(); ctrl.save(); } }
        />
      </div>

      <div>
        { ctrl.saving() ? "Saving..." : ""}
        { ctrl.saved() ? "Saved!" : ""}
      </div>
    </form>;
  }
};

module.exports = SchemeCreationForm;

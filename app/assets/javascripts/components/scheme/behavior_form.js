var m = require('mithril');
const RadioGroup = require('../inputs/radio_group.js');
const CheckboxGroup = require('../inputs/checkbox_group.js');

const BehaviorForm = {
  controller: function (args) {
    var ctrl = {
      behavior: args.behavior,
      modifiers: args.modifiers,
      index: args.index,
      parentBehaviors: args.parentBehaviors
    };

    ctrl.selected_type = function(key) {
      return this.behavior.type == key
    }.bind(ctrl);
    ctrl.selected_target = function(key){
      return this.behavior.target == key
    }.bind(ctrl);

    return ctrl;
  },
  view: function(ctrl) {
    return <div class="control-group">
      <div class="field">
        <label for={`scheme_behavior_${ ctrl.index }_name`}>
          Name
        </label>
        <input
          type="text"
          class="field_entry"
          id={`scheme_behavior_${ ctrl.index }`}
          name={`scheme[behavior][${ ctrl.index }][name]`}
          value={ctrl.behavior.name}
          onchange={(e)=> { ctrl.behavior.name = e.target.value }}
        />
      </div>

      <RadioGroup text="Type"
          namespace="scheme"
          item="behavior"
          attribute="type"
          index={ctrl.index}
          collection={[
            ['State','state'],
            ['Event','event']
          ]}
          checked={ ctrl.selected_type }
          update={ (newValue) => { ctrl.behavior.type = newValue } }
        />

      <RadioGroup text="Target Type"
          namespace="scheme"
          item="behavior"
          attribute="target"
          index={ctrl.index}
          collection={[
            ['Self','self'],
            ['Other','other'],
            ['None','none']
          ]}
          checked={ ctrl.selected_target }
          update={ (newValue) => { ctrl.behavior.target = newValue } }
        />

      <div class="control-group">
        <label for={`scheme_behavior_${ ctrl.index }_mutually_exclusive`}>
          Mutually Exclusive?
        </label>
        <input
          type="checkbox"
          id={`scheme_behavior_${ ctrl.index }_mutually_exclusive`}
          name={`scheme[behavior][${ ctrl.index }][mutually_exclusive]`}
          checked={ctrl.behavior.mutually_exclusive}
          onchange={(e)=> { ctrl.behavior.mutually_exclusive = e.target.checked }}
        />
      </div>
      { renderParentBehaviors(ctrl.parentBehaviors, ctrl.index) }
      <CheckboxGroup
        divText="Modifiers:"
        collection={ctrl.modifiers}
        associations={ctrl.behavior.modifiers}
        namespace="scheme"
        item="modifier"
        attribute="name"
      />
    </div>
  }
};

module.exports = BehaviorForm;

function renderParentBehaviors(parentBehaviors, index) {
  if (parentBehaviors) {
    return <div class="control-group">
      <label for={`parent_behavior_${index}`}>Parent Behavior: </label>
      <select id={`parent_behavior_${index}`}>
        <option></option>
        {parentBehaviors.map((behavior) => {
          return <option value={behavior.uuid}>{behavior.name}</option>;
        })}
      </select>
    </div>;
  }
}

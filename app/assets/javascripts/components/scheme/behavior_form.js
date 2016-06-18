const BehaviorForm = {
  controller: function(args) {
    // change to args.behavior || new Behavior() when model created
    // TODO: how to account for parent/child group?
    return {
      behavior: args.behavior,
      index: args.index
    }
  },
  view: function(ctrl) {
    return <div>
      <div class="control-group">
        <label for={`scheme_behavior_${ ctrl.index }_name`}>
          Name
        </label>
        <input
          type="text"
          id={`scheme_behavior_${ ctrl.index }`}
          name={`scheme[behavior][${ ctrl.index }][name]`}
          value={ctrl.behavior.name}
          onchange={(e)=> { ctrl.behavior.name = e.target.value }}
        />
      </div>
      <div class="control-group">
        <label>Type</label>
        <label for={`scheme_behavior_${ ctrl.index }_type_state`}>
          State
        </label>
        <input
          type="radio"
          id={`scheme_behavior_${ ctrl.index }_type_state`}
          name={`scheme[behavior][${ ctrl.index }][type]`}
          value="state"
          checked={ctrl.behavior.type == "state"}
          onchange={(e)=> { if(e.target.checked) { ctrl.behavior.type = e.target.value }}}
        />
        <label for={`scheme_behavior_${ ctrl.index }_type_event`}>
          Event
        </label>
        <input
          type="radio"
          id={`scheme_behavior_${ ctrl.index }_type_event`}
          name={`scheme[behavior][${ ctrl.index }][type]`}
          value="event"
          checked={ctrl.behavior.type == "event"}
          onchange={(e)=> { if(e.target.checked) { ctrl.behavior.type = e.target.value }}}
        />
      </div>
      <div class="control-group">
        <label>Target Type</label>
        <label for={`scheme_behavior_${ ctrl.index }_target_self`}>
          Self
        </label>
        <input
          type="radio"
          id={`scheme_behavior_${ ctrl.index }_target_self`}
          name={`scheme[behavior][${ ctrl.index }][target]`}
          value="self"
          checked={ctrl.behavior.target == "self"}
          onchange={(e)=> { if(e.target.checked) { ctrl.behavior.target = e.target.value }}}
        />
        <label for={`scheme_behavior_${ ctrl.index }_target_other`}>
          Other
        </label>
        <input
          type="radio"
          id={`scheme_behavior_${ ctrl.index }_target_other`}
          name={`scheme[behavior][${ ctrl.index }][target]`}
          value="other"
          checked={ctrl.behavior.target == "other"}
          onchange={(e)=> { if(e.target.checked) { ctrl.behavior.target = e.target.value }}}
        />
        <label for={`scheme_behavior_${ ctrl.index }_target_none`}>
          None
        </label>
        <input
          type="radio"
          id={`scheme_behavior_${ ctrl.index }_target_none`}
          name={`scheme[behavior][${ ctrl.index }][target]`}
          value="none"
          checked={ctrl.behavior.target == "none"}
          onchange={(e)=> { if(e.target.checked) { ctrl.behavior.target = e.target.value }}}
        />
      </div>
      <div class="control-group">
        <label for={`scheme_behavior_${ ctrl.index }_mutually_exclusive`}>
          Mutually Exclusive?
        </label>
        <input
          type="checkbox"
          id={`scheme_behavior_${ ctrl.index }_mutually_exclusive`}
          name={`scheme[behavior][${ ctrl.index }][mutually_exclusive]`}
          checked={ctrl.behavior.mutually_exclusive}
          onchange={(e)=> { ctrl.behavior.mutually_exclusive = e.target.value }}
        />
      </div>
    </div>
  }
};

module.exports = BehaviorForm;

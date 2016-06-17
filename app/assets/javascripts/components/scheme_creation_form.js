const SchemeCreationForm = {
  controller: function () {
    return {
      // scheme: new Scheme()
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
        <legend>Subjects</legend>
        {ctrl.scheme.subjects.map((subject, index) => {
          return (
            <div class="control-group">
              <label for={`scheme_subject_${ index }`}>
                Name
              </label>
              <input
                type="text"
                id={`scheme_subject_${ index }`}
                name={`scheme[subject][${ index }]`}
                value={subject}
              />
            </div>
          )
        })}
      </fieldset>
      <fieldset>
        <legend>Behaviors</legend>
        {ctrl.scheme.behaviors.map((behavior, index) => {
          return <div>
            <div class="control-group">
              <label for={`scheme_behavior_${ index }_name`}>
                Name
              </label>
              <input
                type="text"
                id={`scheme_behavior_${ index }`}
                name={`scheme[behavior][${ index }][name]`}
                value={behavior.name}
              />
            </div>
            <div class="control-group">
              <label>Type</label>
              <label for={`scheme_behavior_${ index }_type_state`}>
                State
              </label>
              <input
                type="radio"
                id={`scheme_behavior_${ index }_type_state`}
                name={`scheme[behavior][${ index }][type]`}
                value="state"
                checked={behavior.type == "state"}
              />
              <label for={`scheme_behavior_${ index }_type_event`}>
                Event
              </label>
              <input
                type="radio"
                id={`scheme_behavior_${ index }_type_event`}
                name={`scheme[behavior][${ index }][type]`}
                value="event"
                checked={behavior.type == "event"}
              />
            </div>
            <div class="control-group">
              <label>Target Type</label>
              <label for={`scheme_behavior_${ index }_target_self`}>
                Self
              </label>
              <input
                type="radio"
                id={`scheme_behavior_${ index }_target_self`}
                name={`scheme[behavior][${ index }][target]`}
                value="self"
                checked={behavior.target == "self"}
              />
              <label for={`scheme_behavior_${ index }_target_other`}>
                Other
              </label>
              <input
                type="radio"
                id={`scheme_behavior_${ index }_target_other`}
                name={`scheme[behavior][${ index }][target]`}
                value="other"
                checked={behavior.target == "other"}
              />
              <label for={`scheme_behavior_${ index }_target_none`}>
                None
              </label>
              <input
                type="radio"
                id={`scheme_behavior_${ index }_target_none`}
                name={`scheme[behavior][${ index }][target]`}
                value="none"
                checked={behavior.target == "none"}
              />
            </div>
            <div class="control-group">
              <label for={`scheme_behavior_${ index }_mutually_exclusive`}>
                Mutually Exclusive?
              </label>
              <input
                type="checkbox"
                id={`scheme_behavior_${ index }_mutually_exclusive`}
                name={`scheme[behavior][${ index }][mutually_exclusive]`}
                checked={behavior.mutually_exclusive}
              />
            </div>
          </div>
        })}
      </fieldset>
    </form>;
  }
};

module.exports = SchemeCreationForm;

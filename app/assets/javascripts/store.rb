require 'grand_central/store'
require 'grand_central/model'

require 'actions'

class AppState < GrandCentral::Model
  attributes(
    :subjects,
    :behaviors,
    :modifiers,
    :observations,
    :sessions,
    :current_actor,
    :current_session,
    :new_observation,
    :unsaved_observations,
  )
end

class Subject < GrandCentral::Model
  attributes(
    :id,
    :name,
  )
end

class Behavior < GrandCentral::Model
  attributes(
    :name,
    :type,               # :state or :event
    :mutually_exclusive, # can only be true for :state types
    :target,             # :self, :target, nil
    :parent_behavior,
    :available_modifiers,
  )

  def initialize *args
    super

    @available_modifiers ||= []
  end

  def targetable?
    target == :target
  end
end

class Modifier < GrandCentral::Model
  attributes(
    :name,
  )

  def initialize name
    @name = name
  end
end

class Observation < GrandCentral::Model
  attributes(
    :session_id,
    :time,
    :duration,
    :actor,
    :behavior,
    :modifiers,
    :target,
    :note,
  )

  def initialize *args
    super

    @modifiers ||= []
  end

  def available_modifiers
    if behavior
      behavior.available_modifiers.to_a
    else
      []
    end
  end
end

class Session < GrandCentral::Model
  attributes(
    :id,
    :name,
  )
end

initial_state = AppState.new(
  subjects: [
    Subject.new(id: 1, name: 'Jamie'),
    Subject.new(id: 2, name: 'Jim'),
    Subject.new(id: 3, name: 'Thomas'),
    Subject.new(id: 4, name: 'Julie'),
    Subject.new(id: 5, name: 'Betsy'),
    Subject.new(id: 6, name: 'Christina'),
    Subject.new(id: 7, name: 'Andrew'),
    Subject.new(id: 8, name: 'Ryan'),
  ],
  behaviors: [
    Behavior.new(
      id: 1,
      name: 'Running',
      type: :state,
      mutually_exclusive: true,
      target: nil,
      available_modifiers: %w(fast slow)
    ),
    Behavior.new(
      id: 2,
      name: 'Grooming',
      type: :state,
      mutually_exclusive: true,
      target: :target,
    ),
    Behavior.new(
      id: 3,
      name: 'Eating',
      type: :state,
      mutually_exclusive: true,
      target: nil,
    )
  ],
  modifiers: [
  ],
  observations: [],
  sessions: [],
  current_session: Session.new,
  new_observation: Observation.new,
  unsaved_observations: [],
)

Store = GrandCentral::Store.new(initial_state) do |state, action|
  case action
  when ObserveBehavior
    state.update(
      new_observation: state.new_observation.update(
        behavior: action.behavior,
      ),
    )

  when SetCurrentActor
    new_actor = state.subjects.find { |subject|
      subject.id.to_s == action.actor_id.to_s
    }

    state.update(
      current_actor: new_actor,
      new_observation: state.new_observation.update(
        actor: new_actor,
      ),
    )

  when SetCurrentTarget
    state.update(
      new_observation: state.new_observation.update(
        target: action.target,
      )
    )

  when AddModifier
    observation = state.new_observation
    state.update(
      new_observation: observation.update(
        modifiers: observation.modifiers + [action.modifier],
      ),
    )

  when CompleteObservation
    state.update(
      unsaved_observations: state.unsaved_observations + [state.new_observation],
      new_observation: Observation.new,
    )

  else
    state
  end
end

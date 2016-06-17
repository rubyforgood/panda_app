require 'opal'
require 'clearwater'

require 'store'

class Layout
  include Clearwater::Component

  def render
    div([
      h1(NavLink.new({ href: '/' }, 'Red Pandas')),
      header([
        nav([
          NavLink.new({ href: '/focus/animal' }, 'Focus Animal'),
          NavLink.new({ href: '/focus/scan' }, 'Scan'),
          NavLink.new({ href: '/focus/behavior' }, 'Focus Behavior'),
        ])
      ]),

      outlet || Data.new,
    ])
  end
end

class NavLink
  include Clearwater::Component

  def initialize(properties, label)
    @properties = properties
    @label = label
  end

  def render
    Link.new(defaults.merge(@properties), @label)
  end

  def defaults
    {
      style: {
        color: :blue,
        display: 'inline-block',
        padding: '5px 8px',
      },
    }
  end
end

class Data
  include Clearwater::Component
end

class NewObservation
  include Clearwater::Component

  def render
    div([

    ])
  end

  def handle_submit(event)
    event.prevent

    Store.dispatch UpdateObservation.new
  end
end

class Focus
  include Clearwater::Component

  def render
    div([
      h2('Focus'),
      outlet,
    ])
  end
end

class FocusAnimal
  include Clearwater::Component

  def render
    div([
      h3('Focus animal'),
      select({
        onchange: method(:set_actor)
      }, [option({ value: nil }, 'Select an actor')] + animals.map { |animal|
        option({ value: animal.id, selected: current_actor_id == animal.id }, animal.name)
      }),
      content,
    ])
  end

  def content
    return unless current_actor

    if observation.behavior.nil?
      div([
        header([
          h2("Select behavior"),
        ]),
        Store.state.behaviors.map { |behavior|
          button({ onclick: proc { set_behavior behavior } }, behavior.name)
        }
      ])
    elsif observation.behavior.targetable? && !observation.target
      div([
        h2('Select target'),
        animals.map { |animal|
          button({ onclick: proc { set_target animal } }, animal.name)
        }
      ])
    else
      div([
        available_modifiers.map { |modifier|
          button({ onclick: proc { add_modifier modifier } }, modifier)
        },
        div(button({ onclick: proc { next_behavior } }, 'Next Observation')),
      ])
    end
  end

  def available_modifiers
    observation.available_modifiers - observation.modifiers
  end

  def add_modifier modifier
    Store.dispatch AddModifier.new(observation, modifier)
  end

  def next_behavior
    Store.dispatch CompleteObservation.new
  end

  def current_actor
    Store.state.current_actor
  end

  def current_actor_id
    current_actor && current_actor.id
  end

  def observation
    Store.state.new_observation
  end

  def animals
    Store.state.subjects
  end

  def set_behavior behavior
    Store.dispatch ObserveBehavior.new(behavior)
  end

  def set_actor event
    Store.dispatch SetCurrentActor.new(event.target.value)
  end

  def set_target target
    Store.dispatch SetCurrentTarget.new(target)
  end
end

router = Clearwater::Router.new do
  route 'new_observation' => NewObservation.new

  route 'focus' => Focus.new do
    route 'animal' => FocusAnimal.new
  end
end

app = Clearwater::Application.new(
  component: Layout.new,
  router: router,
)

app.call

Store.on_dispatch do
  app.render
end

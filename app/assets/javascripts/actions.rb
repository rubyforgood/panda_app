require 'grand_central/action'

ObserveBehavior     = GrandCentral::Action.with_attributes(:behavior, :actor)
SetCurrentActor     = GrandCentral::Action.with_attributes(:actor_id)
SetCurrentTarget    = GrandCentral::Action.with_attributes(:target)
AddModifier         = GrandCentral::Action.with_attributes(:observation, :modifier)
CompleteObservation = GrandCentral::Action.create


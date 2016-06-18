FactoryGirl.define do
  factory :observation do
    started_at { Time.now }
    event_type 'event'
    duration_seconds { Random.rand * 10 }
    time_lag_seconds { Random.rand }

    association :observation_session
    association :actor, factory: :subject
    association :behavior
  end
end

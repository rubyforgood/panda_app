FactoryGirl.define do
  factory :observation_session do
    sequence :name do |n| "Animal Observation ##{n}" end
    observation_method 'scan'
    session_interval_seconds 0
    session_duration_seconds 15.minutes
    association :scheme
    association :user

    trait :location_metadata do
      metadata { Hash.new(latitude: 122.02, longitude: 33.56) }
    end
  end
end

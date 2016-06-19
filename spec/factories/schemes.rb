FactoryGirl.define do
  factory :scheme do
    name { Faker::Name.name }
    association :user

    trait :subjects do
      transient do
        subject_count 5
      end

      after(:create) do |obj, evaluator|
        create_list(:subject, evaluator.subject_count, scheme: obj)
      end
    end

    trait :behaviors do
      transient do
        behaviors_count 5
      end

      after(:create) do |obj, evaluator|
        create_list(:behavior, evaluator.behaviors_count, scheme: obj)
      end
    end

  end

  factory :behavior do
    name { Faker::Company.buzzword }
    type 'event'
    target_type 'self'
    association :scheme
  end

  factory :subject do
    name { Faker::Name.first_name }
    association :scheme
  end
end

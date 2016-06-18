FactoryGirl.define do
  factory :scheme do
    name { Faker::Name.name }
    association :user
  end

  factory :behavior do
    name { Faker::Company.buzzword }
  end

  factory :subject do
    name { Faker::Name.first_name }
  end
end

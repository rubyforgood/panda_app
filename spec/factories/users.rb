FactoryGirl.define do
  factory :user do
    email { Faker::Internet.email }
    password 'password1'
  end
end

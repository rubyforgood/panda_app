class Scheme < ActiveRecord::Base
  has_many :behaviors
  has_many :subjects
end

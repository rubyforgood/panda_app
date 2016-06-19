class ObservationSession < ActiveRecord::Base
  belongs_to :scheme
  belongs_to :user

  has_many :observations

  accepts_nested_attributes_for :observations
end

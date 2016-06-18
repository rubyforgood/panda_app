class ObservationSession < ActiveRecord::Base
  belongs_to :scheme
  has_many :observations
  belongs_to :user
end

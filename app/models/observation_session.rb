class ObservationSession < ActiveRecord::Base
  belongs_to :scheme
  has_many :observations
end

class Observation < ActiveRecord::Base
  belongs_to :observation_session
  belongs_to :actor, class_name: Subject
  belongs_to :receiver, class_name: Subject
  belongs_to :behavior

  validates_presence_of :observation_session
end

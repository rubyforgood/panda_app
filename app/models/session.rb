class Session < ActiveRecord::Base
  belongs_to :scheme
  has_many :observations
end

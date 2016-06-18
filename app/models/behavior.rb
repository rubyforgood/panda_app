class Behavior < ActiveRecord::Base
  self.inheritance_column = '__unused'

  belongs_to :scheme
end

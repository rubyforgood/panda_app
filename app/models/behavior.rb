class Behavior < ActiveRecord::Base
  self.inheritance_column = '__unused'

  belongs_to :scheme

  alias_attribute :uuid, :id
end

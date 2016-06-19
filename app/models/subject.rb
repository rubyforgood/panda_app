class Subject < ActiveRecord::Base
  belongs_to :scheme

  alias_attribute :uuid, :id
end

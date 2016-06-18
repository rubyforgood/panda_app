class Scheme < ActiveRecord::Base
  has_many :behaviors
  has_many :subjects
  belongs_to :user

  accepts_nested_attributes_for :behaviors
  accepts_nested_attributes_for :subjects

  alias_attribute :uuid, :id

  def self.build_with_associations(new_attributes, new_associations:)
    scheme = new(new_attributes)

    new_associations.each do |name, values|
      values.each { |v| scheme.association(name).build(v) }
    end

    scheme
  end
end

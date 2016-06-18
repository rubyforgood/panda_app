class Scheme < ActiveRecord::Base
  has_many :behaviors
  has_many :subjects

  accepts_nested_attributes_for :behaviors
  accepts_nested_attributes_for :subjects

  def self.build_with_associations(new_attributes, new_associations:)
    scheme = new(new_attributes)

    new_associations.each do |name, values|
      values.each { |v| scheme.association(name).build(v) }
    end

    scheme
  end
end

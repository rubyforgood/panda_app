json.(@scheme, :name, :id, :subject_groups, :uuid)

json.subjects @scheme.subjects, :id, :name, :groups
json.behaviors @scheme.behaviors, :id, :name, :target_type, :type, :parent_behavior_id

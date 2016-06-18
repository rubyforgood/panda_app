json.(@scheme, :name, :id, :subject_groups)

json.subjects @scheme.subjects, :id, :name, :groups
json.behaviors @scheme.behaviors, :id, :name, :target_type, :type, :parent_behavior_id

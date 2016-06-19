json.(scheme, :name, :id, :uuid, :subject_groups)

json.subjects scheme.subjects, :id, :uuid, :name, :groups
json.behaviors scheme.behaviors, :id, :uuid, :name, :target_type, :type, :parent_behavior_id

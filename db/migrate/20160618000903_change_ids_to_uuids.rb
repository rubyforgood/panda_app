class ChangeIdsToUuids < ActiveRecord::Migration
  def recreate_as_uuid(table, column, *opts)
    remove_column table, column
    add_column table, column, :uuid, *opts
  end

  def recreate_pkey_as_uuid(table, column)
    recreate_as_uuid table, column, null: false, primary_key: true,
      default: 'uuid_generate_v4()'
  end

  def change
    enable_extension "uuid-ossp"

    remove_index :behaviors, name: 'index_behaviors_on_scheme_id_and_name'

    recreate_pkey_as_uuid :behaviors, :id
    recreate_as_uuid :behaviors, :scheme_id, null: false
    recreate_as_uuid :behaviors, :parent_behavior_id
    add_index :behaviors, [:scheme_id, :name], unique: true

    remove_index :observations, name: 'index_observations_on_session_id'
    recreate_pkey_as_uuid :observations, :id
    recreate_as_uuid :observations, :session_id, null: false
    recreate_as_uuid :observations, :behavior_id, null: false
    recreate_as_uuid :observations, :actor_id
    recreate_as_uuid :observations, :receiver_id
    add_index :observations, :session_id

    recreate_pkey_as_uuid :sessions, :id
    recreate_as_uuid :sessions, :scheme_id
    recreate_as_uuid :sessions, :focal_animal_id
    recreate_as_uuid :sessions, :focal_behavior_id

    remove_index :schemes, name: 'index_schemes_on_id_and_user_id_and_name'
    recreate_pkey_as_uuid :schemes, :id
    add_index :schemes, [:id, :user_id, :name], unique: true

    remove_index :subjects, name: 'index_subjects_on_scheme_id_and_name'
    recreate_pkey_as_uuid :subjects, :id
    recreate_as_uuid :subjects, :scheme_id
    add_index :subjects, [:scheme_id, :name], unique: true
  end
end

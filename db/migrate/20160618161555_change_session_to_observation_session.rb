class ChangeSessionToObservationSession < ActiveRecord::Migration
  def change
    rename_table :sessions, :observation_sessions

    remove_index :observations, name: 'index_observations_on_session_id'
    rename_column :observations, :session_id, :observation_session_id
    add_index :observations, :observation_session_id
  end
end

class CreateObservations < ActiveRecord::Migration
  def change
    create_table :observations do |t|
      t.integer :session_id, null: false
      t.timestamp :started_at, null: false
      t.string :event_type, null: false
      t.float :duration_seconds
      t.float :time_lag_seconds
      t.integer :behavior_id
      t.integer :actor_id
      t.integer :receiver_id
      t.text :modifiers, array: true, default: []
      t.text :notes
    end

    add_index :observations, :session_id
  end
end

class CreateSessions < ActiveRecord::Migration
  def change
    create_table :sessions do |t|
      t.integer :user_id, null: false
      t.integer :scheme_id, null: false
      t.string :name
      t.string :observation_method
      t.integer :focal_animal_id
      t.integer :focal_behavior_id
      t.float :session_interval_seconds
      t.float :session_duration_seconds
      t.timestamp :started_at
      t.timestamp :finished_at
      t.json :metadata
      t.text :notes
    end
  end
end

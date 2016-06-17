class CreateSubjects < ActiveRecord::Migration
  def change
    create_table :subjects do |t|
      t.integer :scheme_id, null: false
      t.string :name, null: false
      t.text :groups, array: true, default: []
    end

    add_index :subjects, [:scheme_id, :name], unique: true
  end
end

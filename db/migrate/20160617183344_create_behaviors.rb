class CreateBehaviors < ActiveRecord::Migration
  def change
    create_table :behaviors do |t|
      t.integer :scheme_id, null: false
      t.string :name, null: false
      t.string :type, null: false
      t.boolean :mutually_exclusive, default: false
      t.integer :parent_behavior_id
      t.text :modifiers, array: true, default: []
    end
    add_index :behaviors, [:scheme_id, :name], unique: true
  end
end

class CreateSchemes < ActiveRecord::Migration
  def change
    create_table :schemes do |t|
      t.integer :user_id, null: false
      t.string :name, null: false
      t.text :subject_groups, array: true, default: []
    end

    add_index :schemes, [:id, :user_id, :name], unique: true
  end
end

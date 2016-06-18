class AddTargetTypeToBehavior < ActiveRecord::Migration
  def change
    add_column :behaviors, :target_type, :string, null: false
  end
end

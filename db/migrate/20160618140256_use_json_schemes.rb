class UseJsonSchemes < ActiveRecord::Migration
  def change
    remove_column(:schemes, :user_id)
    remove_column(:schemes, :name)
    remove_column(:schemes, :subject_groups)
    drop_table(:behaviors)
    drop_table(:subjects)

    add_column(:schemes, :scheme_json, :json)
    add_column(:schemes, :uuid, :text)
  end
end

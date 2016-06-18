class AddDeviseToUsers < ActiveRecord::Migration
  def self.up
    change_table :users do |t|
      ## Database authenticatable
      t.string :encrypted_password, null: false, default: ""

      ## Rememberable
      t.datetime :remember_created_at

      ## Trackable
      t.integer  :sign_in_count, default: 0, null: false
      t.datetime :current_sign_in_at
      t.datetime :last_sign_in_at
      t.inet     :current_sign_in_ip
      t.inet     :last_sign_in_ip
    end

    add_index :users, :email,                unique: true
    change_column :users, :email, :string, null: false
  end

  def self.down
    raise ActiveRecord::IrreversibleMigration
  end
end

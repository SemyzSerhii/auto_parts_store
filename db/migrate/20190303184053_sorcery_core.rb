class SorceryCore < ActiveRecord::Migration[5.2]
  def change
    User.destroy_all if Rails.env.development?

    remove_column :users, :email, :string
    remove_column :users, :password_digest, :string

    add_column :users, :email, :string, null: false
    add_column :users, :crypted_password, :string
    add_column :users, :salt, :string

    add_index :users, :email, unique: true
  end
end

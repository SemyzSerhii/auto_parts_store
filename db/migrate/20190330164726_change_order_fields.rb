class ChangeOrderFields < ActiveRecord::Migration[5.2]
  def change
    remove_column :orders, :name, :string
    remove_column :orders, :email, :string
    remove_column :orders, :pay_type, :string

    add_column :orders, :number, :string
    add_column :orders, :status, :string
    add_column :orders, :total_price, :decimal

    add_belongs_to :orders, :user, foreign_key: true
  end
end

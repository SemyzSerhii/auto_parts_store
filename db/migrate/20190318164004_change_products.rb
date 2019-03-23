class ChangeProducts < ActiveRecord::Migration[5.2]
  def change
    change_column :products, :mark, :string
    add_column :products, :name, :string
    add_column :products, :company, :string
    add_column :products, :rating, :float, default: 0
  end
end

class ChangeTypeInProducts < ActiveRecord::Migration[5.2]
  def change
    change_column :products, :price, :decimal
    remove_column :products, :mark
    add_column :products, :mark, :float
  end
end

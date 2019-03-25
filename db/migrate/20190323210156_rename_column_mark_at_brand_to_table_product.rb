class RenameColumnMarkAtBrandToTableProduct < ActiveRecord::Migration[5.2]
  def change
    rename_column :products, :mark, :brand
  end
end

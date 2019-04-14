class AddYearToProducts < ActiveRecord::Migration[5.2]
  def change
    add_column :products, :year, :integer
  end
end

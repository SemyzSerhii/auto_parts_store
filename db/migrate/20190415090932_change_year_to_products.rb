class ChangeYearToProducts < ActiveRecord::Migration[5.2]
  def change
    change_column :products, :year, :string
  end
end

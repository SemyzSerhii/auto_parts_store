class AddVinCodeColumnsToProducts < ActiveRecord::Migration[5.2]
  def change
    add_column :products, :wmi, :string
    add_column :products, :vds, :string
  end
end

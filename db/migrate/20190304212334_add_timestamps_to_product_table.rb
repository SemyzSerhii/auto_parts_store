class AddTimestampsToProductTable < ActiveRecord::Migration[5.2]
  def change
  add_timestamps :products
  end
end

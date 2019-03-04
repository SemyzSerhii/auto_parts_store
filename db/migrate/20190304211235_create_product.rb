class CreateProduct < ActiveRecord::Migration[5.2]
  def change
    create_table :products do |t|
      t.string :mark
      t.string :model
      t.integer :price
      t.text :short_description
      t.text :full_description
      t.boolean :in_stock
    end
  end
end

class Cart < ApplicationRecord
  has_many :line_items, dependent: :destroy

  def find_or_create(cart_id)
    find_by(id: cart_id) || create
  end

  def add_product(product)
    current_item = line_items.find_or_initialize_by(product: product)
    current_item.quantity += 1
    current_item.save && current_item
  end

  def total_price_cart
    line_items.sum(&:total_price_product)
  end

  def total_quantity_cart
    line_items.sum(:quantity)
  end
end

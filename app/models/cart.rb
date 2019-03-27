class Cart < ApplicationRecord
  has_many :line_items, dependent: :destroy

  def self.find_or_create(cart_id)
    find_by(id: cart_id) || create
  end

  def total_price_cart
    line_items.sum(&:total_price_product)
  end

  def total_quantity_cart
    line_items.sum(:quantity)
  end
end

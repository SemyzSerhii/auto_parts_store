class LineItem < ApplicationRecord
  belongs_to :product
  belongs_to :cart, optional: true
  belongs_to :order, optional: true

  validates_uniqueness_of :product, scope: :cart
  validates_numericality_of :quantity, greater_than_or_equal_to: 1, only_integer: true

  def total_price_product
    product.price * quantity
  end
end

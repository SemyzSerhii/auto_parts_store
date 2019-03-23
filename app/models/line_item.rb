class LineItem < ApplicationRecord
  belongs_to :product
  belongs_to :cart

  def total_price_product
    product.price * quantity
  end
end

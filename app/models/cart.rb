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

  def self.find_by_cart_token(token)
    decoded_token = JWT.decode token, Rails.application.secrets.secret_key_base, true, { algorithm: 'HS256' }
    find(decoded_token.dig(0, 'cart_id'))
  end

  def generate_cart_token
    payload = { cart_id: id }
    JWT.encode payload, Rails.application.secrets.secret_key_base, 'HS256'
  end
end

class Order < ApplicationRecord
  extend Enumerize

  belongs_to :user

  has_many :line_items, dependent: :destroy

  # https://docs.woocommerce.com/document/managing-orders/
  enumerize :status, in: %i[pending_payment failed processing completed on_hold cancelled refunded], default: :processing

  validates_presence_of :user
  validates :address, presence: true, length: { minimum: 6 }

  def calculate_total_price
    self.total_price = line_items.sum(&:total_price_product)
  end
end

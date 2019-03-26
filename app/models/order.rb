class Order < ApplicationRecord
 has_many :line_items, dependent: :destroy

  validates %i[name email phone address], presence: true
end

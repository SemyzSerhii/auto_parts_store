class Order < ApplicationRecord
 has_many :line_items, dependent: :destroy

 validates_presence_of :name, :email, :phone, :address
end

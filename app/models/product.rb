class Product < ApplicationRecord

  scope :publish, -> { where(in_stock: true) }
  scope :unpublish, -> { where(in_stock: false) }

  validates :name, presence: true, length: { minimum: 3 }
  validates :price, presence: true, format: { with: /\A\d+(?:\.\d{0,2})?\z/ },
            numericality: { greater_than_or_equal_to: 0.01 }
  validates :short_description, presence: true, length: { minimum: 10, maximum: 200 }
  validates :full_description, presence: true, length: { minimum: 20, maximum: 5000 }
  validates :in_stock, inclusion: { in: [ true, false ] }

end


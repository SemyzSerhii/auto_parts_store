class Product < ApplicationRecord
  mount_uploader :image, PictureUploader

  has_many :line_items
  belongs_to :category

  scope :publish, -> { where(in_stock: true) }
  scope :unpublish, -> { where(in_stock: false) }

  validates :name, presence: true, length: { minimum: 3 }
  validates :price, presence: true, format: { with: /\A\d+(?:\.\d{0,2})?\z/ },
            numericality: { greater_than_or_equal_to: 0.01 }
  validates :in_stock, inclusion: { in: [ true, false ] }

end


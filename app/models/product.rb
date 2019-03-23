class Product < ApplicationRecord
  has_many :line_items
  mount_uploader :image, PictureUploader
end


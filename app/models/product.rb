class Product < ApplicationRecord
  mount_uploader :image, PictureUploader
end


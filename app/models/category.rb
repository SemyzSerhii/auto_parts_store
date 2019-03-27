class Category < ApplicationRecord
  has_ancestry

  has_many :products, dependent: :destroy

  validates :title, presence: true, length: { minimum: 3 }, uniqueness: true
  before_save :change_title
end

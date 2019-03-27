class Category < ApplicationRecord
  has_ancestry

  has_many :products, dependent: :destroy

  validates :title, presence: true, length: { minimum: 3 }, uniqueness: true

  def nested_products
    category_ids = [id, children.ids].flatten.uniq.compact
    Product.where(category_id: category_ids)
  rescue Ancestry::AncestryException
    Product.none
  end
end

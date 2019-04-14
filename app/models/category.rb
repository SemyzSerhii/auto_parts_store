class Category < ApplicationRecord
  has_ancestry

  has_many :products, dependent: :destroy

  validates :title, presence: true, length: { minimum: 3 }, uniqueness: true

  def nested_products
    Product.where(category_id: nested_categories_ids)
  rescue Ancestry::AncestryException
    Product.none
  end

  def nested_categories_ids
    [id, children.ids].flatten.uniq.compact
  end
end

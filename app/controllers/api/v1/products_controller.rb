class Api::V1::ProductsController < ApplicationController
  before_action :set_product, only: :show

  def index
    @products = Product.publish
    if params[:category_id]
      @category = Category.find(params[:category_id])
      @products = @category.nested_products
      if params[:by]
        sort_products
      elsif params[:search]
        search_products
      end
    elsif params[:by]
      sort_products
    elsif params[:search]
      search_products
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_product
    @product = Product.find(params[:id])
  end

  def sort_products
    @products = @products.order(order_by)
  end

  def search_products
    @products = @products.search(params[:search])
  end

  def order_by
    case params[:by]
    when 'price_desc' then 'price DESC'
    when 'price' then 'price'
    when 'name_desc' then 'name DESC'
    when 'name' then 'name'
    else ''
    end
  end
end

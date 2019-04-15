class Api::V1::ProductsController < ApplicationController
  before_action :set_product, only: :show

  def index
    @products = Product.published

    filter_by_category if params[:category_id]
    filter_by_vin_code if params[:vin_code]
    search_products if params[:search]
    sort_products if params[:by]
  end

  def show; end

  private

  def set_product
    @product = Product.find(params[:id])
  end

  def sort_products
    @products = @products.order(order_by)
  end

  def search_products
    @products = @products.search(params[:search])
  end

  def filter_by_vin_code
    render json: { error: 'Vin Code should be exactly 17 symbols long' } unless params[:vin_code].size == 17

    @products = @products.by_vin_code(params[:vin_code])
  end

  def filter_by_category
    category = Category.find(params[:category_id])
    @products = @products.where(category_id: category.nested_categories_ids)
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

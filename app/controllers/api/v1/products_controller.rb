class Api::V1::ProductsController < ApplicationController
  before_action :set_product, only: :show

  def index
    if params[:category_id]
      @category = Category.find(params[:category_id])
      @products = @category.products
      @category.children.each do |category|
        @products += category.products
      end
      if params[:by]
        @products = @products.sort_by{|e| e[order_by]}
      end
    elsif params[:by]
      @products = Product.order(order_by)
    else
      @products = Product.publish
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_product
    @product = Product.find(params[:id])
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

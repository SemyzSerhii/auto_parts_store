class API::V1::ProductsController < ApplicationController
  before_action :set_product, only: :show

  def index
    if params[:category_id]
      @category = Category.find(params[:category_id])
      @products = @category.products
      @category.children.each do |category|
        @products += category.products
      end
    else
      @products = Product.all.publish
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_product
    @product = Product.find(params[:id])
  end
end

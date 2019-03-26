class API::V1::ProductsController < ApplicationController
  before_action :set_product, only: :show

  def index
    @products = Product.publish
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_product
    @product = Product.find(params[:id])
  end
end

class Api::V1::LineItemsController < ApplicationController
  def create
    @product = Product.find(params[:product_id])
    @line_item = @cart.add_product(@product)
  end
end

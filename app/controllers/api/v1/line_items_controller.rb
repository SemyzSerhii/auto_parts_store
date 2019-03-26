class Api::V1::LineItemsController < ApplicationController
  before_action :initialize_cart
  before_action :find_product
  before_action :find_item, only: %i[update destroy]

  def create
    @item = @cart.line_items.build(product: @product)

    process_items_update(status: 201, response_action: :show, &:save)
  end

  def update
    process_items_update(response_action: :show) do |record|
      record.update(item_params)
    end
  end

  def destroy
    process_items_update &:destroy
  end

  private

  def process_items_update(status: :ok, response_action: action_name)
    yield(@item) ? render(response_action, status: status) : render_validation_errors(@item)
  end

  def find_product
    @product = Product.find(params[:product_id])
  end

  def find_item
    @item = @cart.line_items.find_by!(product: @product)
  end

  def item_params
    params.require(:quantity)
    params.permit(:quantity)
  end
end

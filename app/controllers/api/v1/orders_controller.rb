class OrdersController < ApplicationController
  before_action :set_cart, only: %i[create]
  before_action :orders_params, only: %i[create show]

  def create
    @order = Order.new(orders_params)
    @order = add_line_items_from_cart(@cart)

    respond_to do |format|
      if @order.save
        Cart.destroy(session[:cart_id])
        session[:cart_id] = nil
        format.json { render action: :show, status: :created, location: @order }
      else
        @cart = current_cart
        format.json { render json: @order.errors, status: :unprocessable_entity}
      end
    end
  end

  def show; end

  private

  def orders_params
    params.require(:order).permit :name, :email, :phone, :address
  end
end

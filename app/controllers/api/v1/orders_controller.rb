class Api::V1::OrdersController < ApplicationController
  def create
    @order = Order.new(orders_params)

    respond_to do |format|
      if @order.save
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

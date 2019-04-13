class Api::V1::OrdersController < ApplicationController
  before_action :initialize_cart, only: :create
  before_action :authenticate_request!, only: %i[show index]

  def create
    authenticate_request!(soft: true)
    if @cart.line_items.present?
      command = CreateOrder.call(user: @current_user, cart: @cart, user_params: user_params, order_params: order_params)
      if command.success?
        @order = command.order

        render :show
      else
        render json: command.errors, status: :unprocessable_entity
      end
    else
      render json: 'Cart empty!', status: :unprocessable_entity
    end
  end

  def show
    @order = Order.find(params[:id])
  end

  def index
    @orders = Order.where(user_id: @current_user.id)
  end

  private

  def user_params
    return if current_user
    params.require(:user).permit(:email, :name)
  end

  def order_params
    params.require(:order).permit(:address, :phone)
  end
end

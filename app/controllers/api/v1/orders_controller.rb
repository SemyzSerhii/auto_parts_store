class Api::V1::OrdersController < ApplicationController
  before_action :initialize_cart, only: :create
  before_action :authenticate_request!, only: %i[show index]

  def create
    authenticate_request!(soft: true)
    command = CreateOrder.call(user: current_user, cart: @cart, user_params: params[:user], order_params: params[:order])
    if command.success?
      render :show
    else
      process_errors(:unprocessable_entity, command.errors)
    end
  end

  def show

  end

  def index
    # current_user.orders
  end
end

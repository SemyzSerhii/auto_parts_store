class Api::V1::CartsController < ApplicationController
  before_action :initialize_cart

  def show
    render status: :ok, json: { cart_token: @cart.generate_cart_token, cart: @cart }
  end

  def destroy
    @cart.destroy
    session[:cart_id] = nil

    render_success
  end
end

class Api::V1::CartsController < ApplicationController
  before_action :initialize_cart

  def show; end

  def destroy
    @cart.destroy
    session[:cart_id] = nil

    render_success
  end
end

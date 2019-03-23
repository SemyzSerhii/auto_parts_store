class Api::V1::CartsController < ApplicationController

  def destroy
    @cart.destroy
    session[:cart_id] = nil
    redirect_to root_path
  end
end

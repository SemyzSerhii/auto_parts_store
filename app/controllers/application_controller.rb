class ApplicationController < ActionController::Base
  include ExceptionConcern

  before_action :set_cart
  skip_before_action :verify_authenticity_token

  def authenticate_request!
    @current_user = User.find_by_token(request.headers['Authorization'])
  end

  private
  def set_cart
    @cart = Cart.find_by(id: session[:cart_id])
    return if @cart

    @cart = Cart.create.session[:cart_id] = @cart.id
  end
end

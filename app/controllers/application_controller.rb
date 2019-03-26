class ApplicationController < ActionController::Base
  include ExceptionConcern
  skip_before_action :verify_authenticity_token

  def authenticate_request!
    @current_user = User.find_by_token(request.headers['Authorization'])
  end

  def initialize_cart
    @cart = Cart.find_or_create(session[:cart_id])
    session[:cart_id] = @cart.id
  end
end

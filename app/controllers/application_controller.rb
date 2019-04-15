class ApplicationController < ActionController::Base
  include ResponseConcern
  include ExceptionConcern

  skip_before_action :verify_authenticity_token

  def authenticate_request!(soft: false)
    return if soft && !request.headers['Authorization'].present?
    @current_user = User.find_by_token(request.headers['Authorization'])
  end

  def initialize_cart
    @cart = Cart.find_or_create(session[:cart_id] || cart_by_token)
    @cart_token = @cart.generate_cart_token unless request.headers['Cart']
    session[:cart_id] = @cart.id
  end

  def cart_by_token
    Cart.find_by_cart_token(request.headers['Cart']) if request.headers['Cart']
  end
end

class ApplicationController < ActionController::Base
  include ExceptionConcern
  skip_before_action :verify_authenticity_token

  def authenticate_request!
    @current_user = User.find_by_token(request.headers['Authorization'])
  end
end

class ApplicationController < ActionController::Base
  include ExceptionConcern

  skip_before_action :verify_authenticity_token
end

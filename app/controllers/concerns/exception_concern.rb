module ExceptionConcern
  extend ActiveSupport::Concern

  included do
    rescue_from JWT::DecodeError do
      render_exception(401, token: 'is invalid or expired')
    end

    rescue_from ActiveRecord::RecordNotFound do |e|
      render_exception(404, e.message)
    end

    rescue_from ActionController::ParameterMissing do |e|
      render_exception(422, e.message)
    end
  end
end
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

    def render_validation_errors(record)
      render json: { messages: record.errors }, status: :unprocessable_entity
    end

    def render_exception(status, message)
      render status: status, json: { messages: { exception: [message] } }
    end
  end
end
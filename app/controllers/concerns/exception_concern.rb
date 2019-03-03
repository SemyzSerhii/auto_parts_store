module ExceptionConcern
  extend ActiveSupport::Concern

  included do
    rescue_from ActiveRecord::RecordNotFound do |e|
      render_exception(404, e)
    end

    rescue_from ActionController::ParameterMissing do |e|
      render_exception(422, e)
    end

    def render_validation_errors(record)
      render json: { messages: record.errors }, status: :unprocessable_entity
    end

    def render_exception(status, e)
      render status: status, json: { messages: { exception: [e.message] } }
    end
  end
end
module ResponseConcern
  extend ActiveSupport::Concern

  included do
    def render_validation_errors(record)
      render json: { messages: record.errors }, status: :unprocessable_entity
    end

    def render_exception(status, message)
      render status: status, json: { messages: { exception: [message] } }
    end

    def render_success(status = :ok)
      render status: status, json: { success: true }
    end
  end
end
module ResponseConcern
  extend ActiveSupport::Concern

  included do
    def render_validation_errors(record)
      process_errors(:unprocessable_entity, messages: record.errors)
    end

    def render_exception(status, message)
      process_errors(status, exception: [message])
    end

    def render_success(status = :ok)
      render status: status, json: { success: true }
    end

    def process_errors(status, messages)
      render status: status, json: { messages: messages }
    end
  end
end
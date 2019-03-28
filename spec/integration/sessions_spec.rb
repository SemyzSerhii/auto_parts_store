require 'swagger_helper'

describe 'Sessions API' do

  path '/api/v1/sessions' do
    post 'Authorization' do
      tags 'Sessions'
      parameter name: :session, in: :body, schema: {
        type: :object,
        properties: {
          session: { type: :object,
            properties: {
              email: { type: :string },
              password: { type: :string }
            }
          }
        }
      },
        required: ['token']

      success_schema(201, 'User authorization', {token: {type: :string}})
      error_schema(422, 'Validation Errors')
    end
  end
end
require 'swagger_helper'

describe 'Users API' do

  path '/api/v1/sessions' do

    post :session do
      tags 'Sessions'
      consumes 'application/json'
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
        required: %w[token]

      response '200', 'login' do
        let(:session) {
          {

            email: 'test_user@gmail.com',
            password: 'password'
          }
        }
        run_test!
      end

      response '422', 'invalid request' do
        let(:user) { { name: 'foo' } }
        run_test!
      end
    end
  end
end
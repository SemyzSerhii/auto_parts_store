require 'swagger_helper'

describe 'Users API' do
  path '/api/v1/users' do
    USER_REQUEST_SCHEMA = {
      type: :object,
      properties: {
        user: {
          type: :object,
          properties: {
            name: { type: :string },
            email: { type: :string },
            password: { type: :string },
            phone: { type: :integer }
          }
        }
      }
    }.freeze

    USER_RESPONSE_PROPS = {
      id: { type: :integer, },
      name: { type: :string },
      email: { type: :string },
      phone: { type: :integer, },
      created_at: { type: :string },
      updated_at: { type: :string }
    }.freeze

    post :user do
      parameter name: :user,
        in: :body,
        schema: USER_REQUEST_SCHEMA,
        required: %w[name email phone]

      response 201, 'User created' do
        schema type: :object, properties: USER_RESPONSE_PROPS
        run_test!
      end

      validation_error_schema
    end

    get 'Retrieves user' do
      parameter name: :Authorization, in: :header, schema: { type: :string }

      response 200, 'Ok' do
        schema type: :object, properties: USER_RESPONSE_PROPS
      end

      response '404', 'user not found' do
        let(:id) { 'invalid' }
        run_test!
      end
    end

    put :user do
      parameter name: :user,
        in: :body,
        schema: USER_REQUEST_SCHEMA,
        required: %w[name email phone]

      response 200, 'User updated' do
        schema type: :object, properties: USER_RESPONSE_PROPS

        run_test!
      end

      response '422', 'invalid request' do
        let(:user) { { name: 'foo' } }
        run_test!
      end
    end
  end
end

require 'swagger_helper'

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
  id: { type: :integer },
  name: { type: :string },
  email: { type: :string },
  phone: { type: :integer },
  created_at: { type: :string },
  updated_at: { type: :string }
}.freeze

describe 'Users API' do
  path '/api/v1/users' do
    post 'Users create' do
      tags 'Users'
      parameter name: :user,
        in: :body,
        schema: USER_REQUEST_SCHEMA,
        required: %w[name email phone password]

      success_schema(201, 'User created', USER_RESPONSE_PROPS)
      error_schema(422, 'Validation Errors')
    end

    get 'Get create'  do
      tags 'Users'
      parameter name: :Authorization, in: :header, schema: { type: :string }

      success_schema(200, 'User found', USER_RESPONSE_PROPS)
      error_schema(404, 'User not found')
    end

    put 'Users udate'  do
      tags 'Users'
      parameter name: :Authorization, in: :header, schema: { type: :string }
      parameter name: :user,
        in: :body,
        schema: {type: :object,
          properties: {
            user: {
              type: :object,
              properties: {
                change_this_string_to_the_params_you_need_to_change: {
                  type: :string },
              }
            }
          }
        },
        required: %w[name email phone]

      success_schema(200, 'User updated', USER_RESPONSE_PROPS)
      error_schema(422, 'Validation Errors')
    end
  end
end

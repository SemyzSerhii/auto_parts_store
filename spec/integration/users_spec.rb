require 'swagger_helper'

describe 'Users API' do

  path '/api/v1/users' do

    post :user do
      tags 'Users'
      consumes 'application/json'
      parameter name: :user, in: :body, schema: {
        type: :object,
        properties: {
          user: { type: :object,
            properties: {
              name: { type: :string },
              email: { type: :string },
              password: { type: :string },
              phone: { type: :integer}
            }
          }
        }
      },
        required: %w[name email phone]

      response '200', 'user created' do
        let(:user) {
          {
            name: 'Admin',
            email: 'admin@gmail.com',
            phone: 937588895,
            password: '1234567'
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

  path  '/admin/users/{id}' do

    get 'Retrieves user' do
      tags 'Users'
      produces 'application/json', 'application/xml'
      parameter name: :id, in: :path, type: :string

      response '200', 'name found' do
        schema type: :object,
          properties: {
            id: { type: :integer, },
            name: { type: :string },
            email: { type: :string },
          },
          required: %w[id name email]

        let(:id) { User.create(name: 'admin', email: 'admin@gmail.com', password_digest: '123') }
        run_test!
      end

      response '404', 'user not found' do
        let(:id) { 'invalid' }
        run_test!
      end
    end
  end
end

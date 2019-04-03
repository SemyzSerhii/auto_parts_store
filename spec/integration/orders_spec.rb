require 'swagger_helper'

ORDER_RESPONSE_PROPS = {
}

describe 'Order API' do
  path '/api/v1/orders' do
    post 'Order' do
      tags 'Order'

      declare_auth_parameter

      parameter name: :order_params, in: :body,
        schema: {
          properties: {
            order: {
              type: :object,
              properties: {
                address: { type: :string },
                phone: { type: :integer }
              }
            },
            user: {
              type: :object,
              properties: {
                name: { type: :string },
                email: { type: :string }
              }
            }
          }
        }
      response 200, 'Order created' do
        schema type: :object, properties: ORDER_RESPONSE_PROPS
        let(:Authorization) { nil }
        let(:order_params) { { user: { name: 'some name', email: 'email@example.com' }, order: { address: 'Some address', phone: 987654321 } } }

        run_test!
      end

      response 422, 'Validation Errors' do
        schema type: :object,
          properties: {
            messages: {
              type: :object,
              properties: {
                error_key: {
                  type: :array,
                  items: { type: :string }
                }
              }
            }
          }

        let(:Authorization) { nil }
        let(:order_params) { { user: { name: 'some name' }, order: { address: 'Some address', phone: 987654321 } } }

        run_test!
      end
    end
  end
end

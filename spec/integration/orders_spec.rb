require 'swagger_helper'

ORDER_RESPONSE_PROPS = {
  id: { type: :integer },
  product_id: { type: :string },
}

describe 'Order API' do
  path '/api/v1/orders' do
    post 'Order' do
      tags 'Order'

      declare_auth_parameter

      parameter name: :order, in: :body,
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

      success_schema(200, 'Order created', ORDER_RESPONSE_PROPS) do
        # let(:user) { { user: { name: 'some name', email: 'email@example.com' }, order: { address: 'Some address', phone: 987654321 } } }
      end

      error_schema(422, 'Validation Errors')
    end
  end
end

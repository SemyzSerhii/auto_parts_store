require 'swagger_helper'

CART_RESPONSE_PROPS = {
  id: { type: :integer},
  product_id: {type: :string},
}

describe 'Cart API' do
  path '/api/v1/cart' do
    get 'Cart' do
      tags 'Cart'

      success_schema(200, 'Cart found', CART_RESPONSE_PROPS)
      error_schema(404, 'Cart not found')
    end
  end
end

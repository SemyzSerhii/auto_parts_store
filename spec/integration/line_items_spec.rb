require 'swagger_helper'

LINE_ITEM_RESPONSE_PROPS = {
  id: { type: :integer },
  quantity: { type: :integer },
  product: { type: :object }
}

describe 'Line_items API' do
  path '/api/v1/line_items' do
    post 'Line items create' do
      tags 'Line items'
      parameter name: :Authorization, in: :header, schema: { type: :string }
      parameter name: :product_id, in: :body, schema: {
        properties: { product_id: { type: :integer } }
      },
        required: ['product_id']

      success_schema(201, 'Line items created', LINE_ITEM_RESPONSE_PROPS)
      error_schema(422, 'Validation Errors')
    end
  end

  path '/api/v1/line_items/{id}' do
    put 'Line items update' do
      tags 'Line items'
      parameter name: :Authorization, in: :header, schema: { type: :string }
      parameter name: :quantity, in: :body,
        schema: { type: :object,
              properties: { quantity: { type: :integer } }
        }
      parameter name: :product_id, in: :body, schema: {
        properties: { product_id: { type: :integer } }
      },
        required: %w[quantity product_id]

      success_schema(201, 'Line items updated', LINE_ITEM_RESPONSE_PROPS)
      error_schema(422, 'Validation Errors')
    end


    delete 'Line items delete' do
      tags 'Line items'
      parameter name: :Authorization, in: :header, schema: { type: :string }
      parameter name: :product_id, in: :body, schema: {
        properties: { product_id: { type: :integer } }
      },
        required: ['id']

      response 201, 'Line items delete'
      error_schema(422, 'Validation Errors')
    end
  end
end

require 'swagger_helper'

PRODUCT_RESPONSE_PROPS = {
    id: { type: :integer },
    name: { type: :string },
    price: { type: :decimal },
    short_description: { type: :text }
}.freeze

describe 'Products API' do
  path '/api/v1/products/categories/{category_id}' do
    get 'Find products by category' do
      tags 'Products'
      parameter name: :category_id, in: :path, schema: { type: :integer },
      required: ['category_id']

      success_schema(200, 'Products found', PRODUCT_RESPONSE_PROPS)
      error_schema(404, 'Products not found')
      end
    end

  path  '/api/v1/products/{id}' do
    get 'Find product by id' do
      tags 'Product'
      parameter name: :id, in: :path, schema: { type: :integer },
      required: ['id']

      success_schema(200, 'Product found', PRODUCT_RESPONSE_PROPS)
      error_schema(404, 'Products not found')
    end
  end

  path  '/api/v1/products' do
    get 'Find products' do
      tags 'Products'

      success_schema(200, 'Product found', PRODUCT_RESPONSE_PROPS)
      error_schema(404, 'Products not found')
    end
  end
end

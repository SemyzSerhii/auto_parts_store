require 'swagger_helper'

PRODUCTS_RESPONSE_PROPS = {
    id: { type: :integer },
    name: { type: :string },
    price: { type: :decimal },
    short_description: { type: :text }
}

describe 'Products API' do
  path '/api/v1/products/categories/{category_id}' do
    get 'Find products by category' do
      tags 'Products'
      parameter name: :category_id, in: :path, schema: { type: :integer },
      required: ['category_id']

      success_schema(200, 'Products found', PRODUCTS_RESPONSE_PROPS)
      error_schema(404, 'Products not found')
      end
    end

  path  '/api/v1/products/{id}' do
    get 'Find product by id' do
      tags 'Products'
      parameter name: :id, in: :path, schema: { type: :integer },
      required: ['id']

      success_schema(200, 'Product found', PRODUCTS_RESPONSE_PROPS)
      error_schema(404, 'Product not found')
    end
  end

  path  '/api/v1/products' do
    get 'Find products' do
      tags 'Products'

      success_schema(200, 'Products found', PRODUCTS_RESPONSE_PROPS)
      error_schema(404, 'Products not found')
    end
  end

  path  '/api/v1/sort/{sort_by}' do
    get 'Sort products (price_desc, price, name_desc, name)' do
      tags 'Products'
      parameter name: :sort_by, in: :path, schema: { type: :string }, required: ['sort_by']

      success_schema(200, 'Products sort', PRODUCTS_RESPONSE_PROPS)
      error_schema(404, 'Products not sort')
    end
  end

  path '/api/v1/products/categories/{category_id}/sort/{sort_by}' do
    get 'Sort products in category (price_desc, price, name_desc, name)' do
      tags 'Products'
      parameter name: :category_id, in: :path, schema: { type: :integer }, required: ['category_id']
      parameter name: :sort_by, in: :path, schema: { type: :string }, required: ['sort_by']

      success_schema(200, 'Products sorted', PRODUCTS_RESPONSE_PROPS)
      error_schema(404, 'Products not sorted')
    end
  end

  path  '/api/v1/products?search={search}' do
    get 'Search products by name, model, company, brand' do
      tags 'Products'
      parameter name: :search, in: :path, schema: { type: :string }, required: ['search']

      success_schema(200, 'Products found', PRODUCTS_RESPONSE_PROPS)
      error_schema(404, 'Products not found')
    end
  end

  path '/api/v1/products/categories/{category_id}?search={search}' do
    get 'Search products in category by name, model, company, brand' do
      tags 'Products'
      parameter name: :category_id, in: :path, schema: { type: :integer }, required: ['category_id']
      parameter name: :search, in: :path, schema: { type: :string }, required: ['search']

      success_schema(200, 'Products found', PRODUCTS_RESPONSE_PROPS)
      error_schema(404, 'Products not found')
    end
  end
end

require 'swagger_helper'

describe 'Products API' do

  path '/api/v1/products' do

    get 'Products' do
      tags 'Products'
      produces 'application/json', 'application/xml'

      response '200', 'name found' do
        schema type: :object,
               properties: {
                   id: { type: :integer, },
                   name: { type: :string },
                   price: { type: :decimal },
                   short_description: { type: :text }
               },
               required: [ 'id', 'name', 'price']

        let(:id) { Product.create(name: 'Filter', category_id: 1, price: 1.1) }
        run_test!
      end

      response '404', 'product not found' do
        let(:id) { 'invalid' }
        run_test!
      end
    end
  end

  path  '/api/v1/products/{id}' do

    get 'Product' do
      tags 'Product'
      produces 'application/json', 'application/xml'
      parameter name: :id, in: :path, type: :string

      response '200', 'name found' do
        schema type: :object,
               properties: {
                   id: { type: :integer, },
                   name: { type: :string },
                   price: { type: :decimal },
                   short_description: { type: :text }
               },
               required: %w[id name price]

        let(:id) { Product.create(name: 'Filter', category_id: 1, price: 1.1) }
        run_test!
      end

      response '404', 'product not found' do
        let(:id) { 'invalid' }
        run_test!
      end
    end
  end
end

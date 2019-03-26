require 'swagger_helper'

describe 'Categories API' do

  path '/api/v1/categories' do

    get 'Categories' do
      tags 'Categories'
      produces 'application/json', 'application/xml'

      response '200', 'name found' do
        schema type: :object,
               properties: {
                   id: { type: :integer, },
                   title: { type: :string },
                   ancestry: { type: :integer }
               },
               required: [ 'id', 'title']

        let(:id) { Category.create(title: 'Filters', ancestry: null).id }
        run_test!
      end
    end
  end

  path  '/api/v1/products/categories/{category_id}' do

    get 'Category products' do
      tags 'Products'
      produces 'application/json', 'application/xml'
      parameter name: :category_id, in: :path, type: :string

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

      response '404', 'category not found' do
        let(:id) { 'invalid' }
        run_test!
      end
    end
  end
end

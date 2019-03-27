require 'swagger_helper'

describe 'Pages API' do

  path '/api/v1/pages' do

    get 'Pages' do
      tags 'Pages'
      produces 'application/json', 'application/xml'

      response '200', 'name found' do
        schema type: :object,
               properties: {
                   id: { type: :integer, },
                   title: { type: :string },
                   body: { type: :text }
               },
               required: %w[id title body]

        let(:id) { Pages.create(title: 'About us', body: 'Bootstrap includes several predefined button styles.').id }
        run_test!
      end

      response '404', 'Page not found' do
        let(:id) { 'invalid' }
        run_test!
      end
    end
  end

  path  '/api/v1/pages/{id}' do

    get 'Page' do
      tags 'Pages'
      produces 'application/json', 'application/xml'
      parameter name: :id, in: :path, type: :string

      response '200', 'name found' do
        schema type: :object,
               properties: {
                   id: { type: :integer, },
                   title: { type: :string },
                   body: { type: :text }
               },
               required: %w[id title body]

        let(:id) { Pages.create(title: 'About us', body: 'Bootstrap includes several predefined button styles.').id }
        run_test!
      end

      response '404', 'Pages not found' do
        let(:id) { 'invalid' }
        run_test!
      end
    end
  end
end

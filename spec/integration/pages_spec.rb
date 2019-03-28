require 'swagger_helper'

PAGES_RESPONSE_PROPS = {
  id: { type: :integer},
  title: {type: :string},
  body: {type: :text},
  created_at: {type: :string},
  updated_at: {type: :string}
}

describe 'Pages API' do
  path '/api/v1/pages' do
    get 'Pages' do
      tags 'Pages'

      success_schema(200, 'Pages found', PAGES_RESPONSE_PROPS)
      error_schema(404, 'Pages not found')
    end
  end

  path  '/api/v1/pages/{id}' do
    get 'Find page by id' do
      tags 'Pages'
      parameter name: :id, in: :path, type: :string,
      required: ['id']

      success_schema(200, 'Pages found', PAGES_RESPONSE_PROPS)
      error_schema(404, 'Pages not found')
    end
  end
end

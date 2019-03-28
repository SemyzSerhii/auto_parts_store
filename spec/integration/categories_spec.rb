require 'swagger_helper'

CATEGORY_RESPONSE_PROPS = {
  id: { type: :integer },
  title: { type: :string },
  ancestry: { type: :integer },
  created_at: { type: :string },
  updated_at: { type: :string }
}.freeze

describe 'Categories API' do
  path '/api/v1/categories' do
    get 'Categories' do
      tags 'Categories'

      success_schema(200, 'Categories found', CATEGORY_RESPONSE_PROPS)
      error_schema(404, 'Categories not found')
    end
  end
end

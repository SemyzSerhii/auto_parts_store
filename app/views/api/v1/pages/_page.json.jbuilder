json.extract! page, :id, :title, :body, :created_at, :updated_at
json.url api_v1_page_url(page, format: :json)

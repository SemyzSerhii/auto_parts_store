json.extract! product, :id,  :created_at, :updated_at
json.url api_v1_product_url(product, format: :json)
json.extract! product, :id, :mark, :model, :price,
              :name, :company, :rating, :image,
              :short_description, :full_description,
              :in_stock, :created_at, :updated_at
json.url api_v1_product_url(product, format: :json)

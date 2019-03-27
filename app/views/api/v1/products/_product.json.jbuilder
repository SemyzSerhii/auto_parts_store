json.extract! product, :id, :brand, :model, :price,
              :name, :company, :rating, :image,
              :short_description, :full_description,
              :in_stock, :created_at, :updated_at,:category
json.url api_v1_product_url(product, format: :json)

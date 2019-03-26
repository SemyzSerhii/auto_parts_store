json.extract! item, :id, :quantity
json.product do
  json.partial! 'api/v1/products/product', product: item.product
end

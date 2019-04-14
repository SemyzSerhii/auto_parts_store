json.line_items do
  json.array! cart.line_items do |item|
    json.partial! 'api/v1/line_items/line_item', item: item
  end
end
json.cart_token cart.generate_cart_token

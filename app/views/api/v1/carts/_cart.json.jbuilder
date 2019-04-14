json.line_items do
  cart.line_items.each do |item|
    json.partial! 'api/v1/line_items/line_item', item: item
  end
end
json.extract! cart, :id
json.cart_token cart.generate_cart_token

json.array! cart.line_items do |item|
  json.partial! 'api/v1/line_items/line_item', item: item
end

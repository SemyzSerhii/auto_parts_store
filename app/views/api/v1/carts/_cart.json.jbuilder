if cart.line_items.present?
  json.array! cart.line_items do |item|
    json.partial! 'api/v1/line_items/line_item', item: item
  end
else
  json.extract! cart,:id
end

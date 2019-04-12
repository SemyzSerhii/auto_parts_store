json.extract! order, :id, :total_price, :address, :status
json.line_items do
  json.array! order.line_items do |item|
    json.partial! 'api/v1/line_items/line_item', item: item
  end
end
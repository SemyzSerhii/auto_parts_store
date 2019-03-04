ActiveAdmin.register Product do
  permit_params :mark, :model, :price, :short_description, :full_description, :in_stock

  index do
    selectable_column
    id_column
    column :mark
    column :model
    column :price
    column :short_description
    column :in_stock
    actions
  end

  form do |f|
    f.inputs 'Product Details' do
      f.input :mark
      f.input :model
      f.input :price
      f.input :short_description
      f.input :in_stock
    end
    f.actions
  end

end

ActiveAdmin.register Product do
  permit_params :mark, :model, :price, :short_description, :full_description, :in_stock, :image

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

  show do
    attributes_table do
      row :id
      row :mark
      row :model
      row :price
      row :short_description
      row :full_description
      row :in_stock
      row :created_at
      row :updated_at
      row :image do |instance|
        image_tag instance.image.url
      end
    end
  end

  form do |f|
    f.inputs 'Product Details' do
      f.input :mark
      f.input :model
      f.input :price
      f.input :short_description
      f.input :full_description
      f.input :in_stock
      f.input :image, as: :file, hint: f.object.image.present? ? image_tag(f.object.image.url) : content_tag(:span, 'no cover page yet')
    end
    f.actions
  end
end

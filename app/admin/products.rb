ActiveAdmin.register Product do
  permit_params :mark, :model, :price, :short_description, :full_description, :in_stock, :image

  scope :all
  scope :publish
  scope :unpublish

  action_item :show_shop, only: :show do
    link_to 'Show at the shop', show_shop_admin_product_path(product), method: :put unless product.in_stock
  end

  action_item :hide_in_shop, only: :show do
    link_to 'Hide in the shop', hide_shop_admin_product_path(product), method: :put if product.in_stock
  end

  member_action :show_shop, method: :put do
    product = Product.find(params[:id])
    product.update(in_stock: true)
    redirect_to admin_product_path(product), notice: 'Product at the shop.'
  end

  member_action :hide_shop, method: :put do
    product = Product.find(params[:id])
    product.update(in_stock: false)
    redirect_to admin_product_path(product), notice: 'Product hide in the shop.'
  end

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
      row :full_description do |product|
        product.full_description.html_safe
      end
      row :in_stock
      row :created_at
      row :updated_at
      row :image
    end
  end

  form do |f|
    f.inputs 'Product Details' do
      f.input :mark
      f.input :model
      f.input :price
      f.input :short_description
      f.input :full_description, as: :trix_editor
      f.input :in_stock
      f.inputs "Image", :multipart => true do
        f.input :image, :as => :file, :hint => f.object.image.present? \
    ? image_tag(f.object.image)
          : content_tag(:span, "no cover page yet")
      end
    end
    f.actions
  end
end

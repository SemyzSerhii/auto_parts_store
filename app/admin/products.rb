ActiveAdmin.register Product do
  permit_params :brand, :model, :price,
                :short_description, :full_description, :in_stock,
                :image, :company, :rating,
                :name, :category_id, :wmi, :vds, :year

  scope :all, default: true
  scope :published
  scope :unpublished

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
    column :name, sortable: :name do |product|
      link_to product.name, admin_product_path(product)
    end

    column :brand
    column :company
    column :category
    column :model
    column :price
    column :year
    column :short_description do |product|
        product.short_description.html_safe if product.short_description.present?
  end
    column :in_stock

    actions
  end

  show do
    attributes_table do
      row :id
      row :name
      row :rating
      row :company
      row :brand
      row :model
      row :price
      row :year
      row :category
      row :short_description do |product|
        product.short_description.html_safe if product.short_description.present?
      end
      row :full_description do |product|
        product.full_description.html_safe if product.full_description.present?
      end
      row :in_stock
      row :created_at
      row :updated_at
      row :image do |instance|
        image_tag instance.image.url if instance.image.present?
      end
    end
  end

  form do |f|
    f.inputs 'Product Details' do
      f.input :name
      f.input :company
      f.input :brand
      f.input :model
      f.input :price
      f.input :wmi
      f.input :vds
      f.input :year
      f.input :category_id, as: :select, collection: Category.all
      f.input :short_description, as: :trix_editor
      f.input :full_description, as: :trix_editor
      f.input :in_stock
      f.input :image, as: :file, hint: f.object.image.present? ? image_tag(f.object.image.url) : content_tag(:span, 'no cover page yet')
    end

    f.actions
  end
end

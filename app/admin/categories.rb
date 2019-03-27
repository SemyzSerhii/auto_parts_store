ActiveAdmin.register Category do
  permit_params :title, :parent_id

  index do
    selectable_column
    id_column
    column :title, sortable: :title do |category|
      link_to category.title, admin_category_path(category)
    end
    column :parent
    column('Products') do |category|
      category.nested_products.count
    end
    column :created_at
    column :updated_at

    actions dropdown: true
  end

  show do
    panel 'Category' do
      attributes_table_for category do
        row :id
        row :title
        row :parent
        row :created_at
        row :updated_at
      end

      panel 'Products' do
        table_for category.nested_products do
          column :id
          column :name do |product|
            link_to product.name, admin_product_path(product)
          end
          column :brand
          column :company
          column :model
          column :price
          column :short_description do |product|
            product.short_description.html_safe
          end
          column :in_stock
          column :rating
          column :created_at
          column :updated_at
        end
      end
    end
  end

  form do |f|
    f.inputs 'Category Details' do
      f.input :title
      f.input :parent_id, as: :select, collection: Category.where.not(id: category)
    end

    f.semantic_errors

    f.actions
  end

end

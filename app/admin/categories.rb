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
      @children_products = 0
      category.children.each { |child| @children_products = child.products.size }
      category.products.count + @children_products
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

      @products = category.products
      category.children.each { |child| @products += child.products }

      if @products.present?
        table_for @products do
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
    fieldset class: 'inputs' do
      ol do
        li f.input :title
        li f.input :parent_id, as: :select, collection: Category.where.not(id: category)
      end
    end
    f.actions
  end

end

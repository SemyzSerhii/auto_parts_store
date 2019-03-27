ActiveAdmin.register Page do
  permit_params :title, :body

  index do
    selectable_column
    column :id
    column :title, sortable: :title do |page|
      link_to page.title, admin_page_path(page)
    end
    column 'Body' do |page|
      page.body.html_safe
    end
    column :created_at
    column :updated_at
    actions dropdown: true
  end

  show do
    attributes_table do
      row :id
      row :title
      row :body do |page|
        page.body.html_safe
      end
      row :created_at
      row :updated_at
    end
  end

  form do |f|
    f.inputs 'Page Details' do
      f.input :title
      f.input :body, as: :trix_editor
    end

    f.semantic_errors
    f.actions
  end
end

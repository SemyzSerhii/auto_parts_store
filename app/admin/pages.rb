ActiveAdmin.register Page do
# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
# permit_params :list, :of, :attributes, :on, :model
#
# or
#
# permit_params do
#   permitted = [:permitted, :attributes]
#   permitted << :other if params[:action] == 'create' && current_user.admin?
#   permitted
# end

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
    fieldset class: 'inputs' do
      f.input :title
      f.input :body, as: :trix_editor
    end

    f.semantic_errors
    f.actions
  end
end

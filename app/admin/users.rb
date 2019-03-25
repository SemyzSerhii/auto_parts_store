ActiveAdmin.register User do
  config.batch_actions = true

  permit_params :name, :email, :password, :phone

  index do
    selectable_column
    id_column
    column :name
    column :email
    column :phone
    column :created_at

    actions
  end

  show do
    attributes_table do
      row :id
      row :name
      row :email
      row :phone
      row :created_at
      row :updated_at
    end
  end

  form do |f|
    f.inputs 'User Details' do
      f.input :name
      f.input :email
      f.input :phone
      f.input :password
    end

    f.semantic_errors
    f.actions
  end
end

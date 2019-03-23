ActiveAdmin.register User do
  config.batch_actions = true

  permit_params :name, :email, :password

  index do
    id_column
    column :name
    column :email
    column :created_at

    actions
  end

  show do
    attributes_table do
      row :id
      row :name
      row :email
      row :created_at
      row :updated_at
    end
  end

  form do |f|
    f.inputs 'User Details' do
      f.input :name
      f.input :email
      f.input :password
    end

    f.semantic_errors
    f.actions
  end
end

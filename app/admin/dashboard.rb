ActiveAdmin.register_page "Dashboard" do

  menu priority: 1, label: proc{ I18n.t("active_admin.dashboard") }

  content title: proc{ I18n.t("active_admin.dashboard") } do
    columns do
      column do
        panel "Recent Users" do
          table_for User.last(5).each do
            column(:name) {|user| link_to(user.name, admin_user_path(user))}
            column(:email)
          end
        end
      end
      column do
        panel "Recent Products" do
          table_for Product.last(5).each do
            column(:name) {|product| link_to(product.name, admin_product_path(product))}
            column(:price)
            column("Description") do |product|
              product.short_description.html_safe if product.short_description.present?
            end
            column(:in_stock)
            column(:category)
          end
        end
      end
    end
  end
end

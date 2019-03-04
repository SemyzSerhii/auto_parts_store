Rails.application.routes.draw do
  devise_for :products, ActiveAdmin::Devise.config
  devise_for :admin_users, ActiveAdmin::Devise.config

  ActiveAdmin.routes(self)

  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'

  namespace :api do
    namespace :v1 do
      resource :users, only: %i[create update show]
      resource :sessions, only: :create
    end
  end
end

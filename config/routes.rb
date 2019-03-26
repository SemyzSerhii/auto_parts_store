Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config

  ActiveAdmin.routes(self)

  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'

  namespace :api, defaults: { format: :json }  do
    namespace :v1 do
      resource :users, only: %i[create update show]
      resource :sessions, only: :create
      resources :products, only: %i[index show]
      resources :pages, only: %i[index show]
      resources :line_items, only: %i[create destroy update]
      resources :carts, only: %i[show destroy]
    end
  end
end

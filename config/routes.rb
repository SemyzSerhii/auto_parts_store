Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config

  ActiveAdmin.routes(self)

  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'

  namespace :api, defaults: { format: :json }  do
    namespace :v1 do
      resource :users, only: %i[create update show]
      resource :sessions, only: :create
      resource :cart, only: %i[show destroy]

      resources :products, only: %i[index show]
      resources :pages, only: %i[index show]
      resources :line_items, only: %i[create update destroy]
      resources :categories, only: :index
      resources :orders, only: %i[create index show]

      get 'products/categories/:category_id' => 'products#index', as: 'category_products'
      get 'products/categories/:category_id/sort/:by' => 'products#index', as: 'category_order'
      get 'sort/:by' => 'products#index', as: 'sort'
    end
  end
end

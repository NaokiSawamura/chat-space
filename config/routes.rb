Rails.application.routes.draw do
  root to: 'messages#index'
  devise_for :users
  resources :users, only: [:index, :edit, :update]
  resources :groups, only: [:new, :create, :edit, :update] do
    resources :messages, only: [:index, :create]
  end
    # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

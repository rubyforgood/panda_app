Rails.application.routes.draw do
  root 'landing#index'
  resources :schemes
end

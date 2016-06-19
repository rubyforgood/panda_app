Rails.application.routes.draw do
  get 'scheme' => 'scheme#index'

  devise_for :users, :skip => [:registrations], :controllers =>
    {
      sessions: "users/sessions",
      omniauth_callbacks: "users/omniauth_callbacks"
    }


  namespace :api do
    resources :schemes, only: [:create, :show, :update, :index]
  end

  get 'observe' => 'landing#observe'

  get '/ui' => 'ui#show'
  root 'landing#index'
end

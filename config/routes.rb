Rails.application.routes.draw do
  get 'scheme' => 'scheme#index'

  devise_for :users, :skip => [:registrations], :controllers =>
    {
      sessions: "users/sessions",
      omniauth_callbacks: "users/omniauth_callbacks"
    }

  authenticate :user do
    namespace :api do
      resources :schemes, only: [:create, :show, :update, :index]
      resources :observation_sessions, only: [:create, :show, :index] do
        resource :exports, only: [:create]
      end
      resources :observations, only: [:create, :update]
    end
  end

  get 'observe' => 'landing#observe'

  get '/ui' => 'ui#show'
  root 'landing#index'
end

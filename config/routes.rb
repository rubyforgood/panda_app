Rails.application.routes.draw do

  devise_for :users, :skip => [:registrations], :controllers =>
    {
      sessions: "users/sessions",
      omniauth_callbacks: "users/omniauth_callbacks"
    }

  namespace :admin do
    if Rails.env.development?
      get 'mailer/:action' => 'mailer#:action'
    end
  end

  authenticate :user do
    get 'observe' => 'landing#observe'
    get 'scheme' => 'scheme#index'
    namespace :api do
      resources :schemes, only: [:create, :show, :update, :index]
      resources :observation_sessions, only: [:create, :show, :index] do
        resource :exports, only: [:create]
      end
      resources :observations, only: [:create, :update]
    end
  end

  root 'landing#index'
end

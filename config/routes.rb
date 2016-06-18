Rails.application.routes.draw do
  root 'landing#index'
  resources :schemes

  devise_for :users, :skip => [:registrations], :controllers =>
    {
      sessions: "users/sessions",
      omniauth_callbacks: "users/omniauth_callbacks"
    }
end

Rails.application.routes.draw do
  get 'scheme' => 'scheme#index'

  get 'observe' => 'landing#observe'

  get '/ui' => 'ui#show'
  root 'landing#index'
end

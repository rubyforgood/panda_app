Rails.application.routes.draw do
  get '/ui' => 'ui#show'
  root 'landing#index'
end

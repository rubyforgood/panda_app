class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  before_action :authenticate_user! unless Rails.env == "development"
  force_ssl if: :ssl_configured?

  def ssl_configured?
    !!Rails.env.production?
  end

  def user_name
    current_user.email.presence || 'Logged in'
  end
  helper_method :user_name
end

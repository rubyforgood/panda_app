class Users::SessionsController < Devise::SessionsController
  def create
    if Rails.env.development?
      email = params[:email]
      user = User.find_or_initialize_by(email: email)
      user.save(validate: false)
      sign_in user
      redirect_to root_path
    else
      super
    end
  end
end

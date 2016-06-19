class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable, :omniauthable,
         :rememberable, :trackable, :validatable

  has_and_belongs_to_many :oauth_credentials
  has_many :schemes
  has_many :observation_sessions

  def self.find_for_google_oauth2(access_token, _signed_in_resource=nil)
    email = access_token.info["email"]
    user = User.where(provider: access_token.provider,
                      uid: access_token.uid).first
    return user if user

    registered_user = User.find_by(email: email)
    registered_user || User.create(provider: access_token.provider,
                                   email: email,
                                   uid: access_token.uid,
                                   password: Devise.friendly_token[0, 20]
                                  )
  end
end

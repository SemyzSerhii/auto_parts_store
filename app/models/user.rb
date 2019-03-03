class User < ApplicationRecord
  has_secure_password

  def jwt_token
    payload = { user_id: id }
    JWT.encode payload, Rails.application.secrets.secret_key_base, 'HS256'
  end
end

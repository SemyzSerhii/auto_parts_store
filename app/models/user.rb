class User < ApplicationRecord
  authenticates_with_sorcery!

  def self.find_by_token(token)
    decoded_token = JWT.decode token, Rails.application.secrets.secret_key_base, true, { algorithm: 'HS256' }
    find(decoded_token.dig(0, 'user_id'))
  end

  def generate_token
    payload = { user_id: id }
    JWT.encode payload, Rails.application.secrets.secret_key_base, 'HS256'
  end
end

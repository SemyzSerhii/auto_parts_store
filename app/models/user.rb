class User < ApplicationRecord
  authenticates_with_sorcery!

  has_many :orders

  validates :email, format: { with: /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i }, uniqueness: true, presence: true
  validates :name, presence: true, length: { minimum: 3 }, uniqueness: true
  validates :password, presence: true, length: { minimum: 6 }, if: ->(record) { record.new_record? || record.password }
  validates :phone, presence: true, length: { is: 9 }

  def self.find_by_token(token)
    decoded_token = JWT.decode token, Rails.application.secrets.secret_key_base, true, { algorithm: 'HS256' }
    find(decoded_token.dig(0, 'user_id'))
  end

  def generate_token
    payload = { user_id: id }
    JWT.encode payload, Rails.application.secrets.secret_key_base, 'HS256'
  end
end

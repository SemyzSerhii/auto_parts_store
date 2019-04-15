class User < ApplicationRecord
  authenticates_with_sorcery!

  has_many :orders

  validates :email, format: { with: /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i }, uniqueness: true, presence: true
  validates :name, presence: true, length: { minimum: 3 }, uniqueness: true
  validates :password, presence: true, length: { minimum: 6 }, if: ->(record) { record.new_record? || record.password }
  validates :phone, presence: true, length: { is: 9 }, uniqueness: true

  def self.find_by_token(token)
    decoded_token = JWT.decode token, Rails.application.secrets.secret_key_base, true, { algorithm: 'HS256' }
    find(decoded_token.dig(0, 'user_id'))
  end

  def generate_token
    payload = { user_id: id }
    JWT.encode payload, Rails.application.secrets.secret_key_base, 'HS256'
  end

  def generate_password_token!
    self.reset_password_token = generate_token_password
    self.reset_password_sent_at = Time.now.utc
    save!
  end

  def password_token_valid?
    (self.reset_password_sent_at + 4.hours) > Time.now.utc
  end

  def reset_password!(password)
    self.reset_password_token = nil
    self.password = password
    save!
  end

  def send_password_reset_email
    UserMailer.password_reset(id).deliver_now
  end

  def send_password_enter_email
    UserMailer.enter_password(id).deliver_now
  end

  private
  def generate_token_password
    SecureRandom.hex(10)
  end
end

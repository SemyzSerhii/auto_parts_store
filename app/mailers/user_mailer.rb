class UserMailer < ApplicationMailer
  def password_reset(user_id)
    @user = User.find_by(id: user_id)
    return unless @user
    mail to: @user.email, subject: "Password reset", from: from
  end

  def enter_password(user_id)
    @user = User.find_by(id: user_id)
    return unless @user
    mail to: @user.email, subject: "Enter reset", from: from
  end
end


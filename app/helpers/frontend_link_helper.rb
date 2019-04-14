module FrontendLinkHelper
  def reset_password_url(token)
    "#{Rails.application.secrets[:frontend_host]}/reset-password?token=#{token}"
  end
end

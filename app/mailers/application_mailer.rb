class ApplicationMailer < ActionMailer::Base
  default from: Rails.application.secrets[:email_from]
  add_template_helper FrontendLinkHelper
  layout 'mailer'

  def from
    Rails.application.secrets[:email_from]
  end
end

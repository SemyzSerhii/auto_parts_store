class Api::V1::ResetPasswordsController < ApplicationController

  def forgot
    if params[:email].blank?
      return render json: {error: 'Email not present'}
    end

    user = User.find_by(email: params[:email])

    if user.present?
      user.generate_password_token!
      user.send_password_reset_email
      render_success
    else
      process_errors(:not_found, 'Email address not found. Please check and try again.')
    end
  end

  def reset
    user = User.find_by(reset_password_token: params[:token])

    if user.present? && user.password_token_valid?
      if user.reset_password!(params[:password])
        render_success
      else
        process_errors(:unprocessable_entity, user.errors.full_messages)
      end
    else
      process_errors(:not_found, 'Link not valid or expired. Try generating a new link.')
    end
  end
end

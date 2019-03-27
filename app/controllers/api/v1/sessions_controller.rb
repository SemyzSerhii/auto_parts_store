class Api::V1::SessionsController < ApplicationController
  def create
    user = User.authenticate(session_params[:email], session_params[:password])

    if user.present?
      render status: :ok, json: { token: user.generate_token }
    else
      raise ActiveRecord::RecordNotFound, 'invalid email or password'
    end
  end

  private

  def session_params
    params.require(:session).permit :email, :password
  end
end

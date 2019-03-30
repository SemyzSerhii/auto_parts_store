class Api::V1::SessionsController < ApplicationController
  def create
    user = User.authenticate(session_params[:email], session_params[:password])

    if user.present?
      response.headers['Authorization'] = user.generate_token
      render json: {message: ['Login successful!']}
    else
      raise ActiveRecord::RecordNotFound, 'invalid email or password'
    end
  end

  private

  def session_params
    params.require(:session).permit :email, :password
  end
end

class API::V1::UsersController < ApplicationController
  before_action :authenticate_request!, only: %i[show update]
  before_action :set_user, only: %i[update show]

  def create
    @user = User.new(user_params)

    if @user.save
      render :show, status: :created
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def update
    if @user.update(user_params)
      render :show, status: :ok
    else
      render_validation_errors(@user)
    end
  end

  def show
    render status: :ok
  end

  private

  def set_user
    @user = current_user
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def user_params
    params.require(:user).permit :email, :password, :name, :phone
  end
end

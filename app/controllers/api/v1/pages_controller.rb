class API::V1::PagesController < ApplicationController
  before_action :set_page, only: :show

  def index
    @pages = Page.all
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_page
      @page = Page.find(params[:id])
    end
end

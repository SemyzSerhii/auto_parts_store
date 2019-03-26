class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  def change_title
    self.title = self.title.capitalize
  end
end

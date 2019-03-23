class Page < ApplicationRecord
  validates :title, presence: true, length: { minimum: 3 }
  validates :body, presence: true, length: { minimum: 20 }

  before_save :change_title

  def to_param
    [id, title.parameterize].join("-")
  end

  def change_title
    self.title = self.title.capitalize
  end
end

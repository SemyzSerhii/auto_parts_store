class Product < ApplicationRecord
  mount_uploader :image, PictureUploader

  has_many :line_items
  belongs_to :category

  scope :published, -> { where(in_stock: true) }
  scope :unpublished, -> { where(in_stock: false) }
  scope :by_vin_code, ->(code) { where(wmi: decode_wmi(code), vds: decode_vds(code)) }

  validates :name, presence: true, length: { minimum: 3 }
  validates :price, presence: true, format: { with: /\A\d+(?:\.\d{0,2})?\z/ },
            numericality: { greater_than_or_equal_to: 0.01 }
  validates :in_stock, inclusion: { in: [ true, false ] }
  validates :year, format: { with: /\A\d+\z/, message: 'Number only' }

  def self.search(search)
    Product.published.where('name ILIKE :search OR model ILIKE :search OR brand ILIKE :search
OR company ILIKE :search OR year LIKE :search',
                  search: "%#{search}%")
  end

  def self.decode_wmi(vin_code)
    vin_code[0..2] # WMI (World Manufacturers Identification) from 1st to 3th symbols of code
  end

  def self.decode_vds(vin_code)
    # VDS (Vehicle Description Section) from 4th to 9th symbols of code
    vds = vin_code[3..8]

    # VIS (Vehicle Identification Section) Model year part from 10th to 12th symbols of VIN-code
    vis_year = vin_code[9..10]

    "#{vds}#{vis_year}"
  end
end


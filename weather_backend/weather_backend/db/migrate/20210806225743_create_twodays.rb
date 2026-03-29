class CreateTwodays < ActiveRecord::Migration[6.1]
  def change
    create_table :twodays do |t|
      # t.string :date
      # t.string :hour1
      # t.string :hour1temp
      # t.string :feelslike1
      # t.string :chanceofrain1
      # t.string :hour2
      # t.string :hour2temp
      # t.string :feelslike2
      # t.string :chanceofrain2
      # t.string :hour3
      # t.string :hour3temp
      # t.string :feelslike3
      # t.string :chanceofrain3
      # t.string :hour4
      # t.string :hour4temp
      # t.string :feelslike4
      # t.string :chanceofrain4
      # t.string :hour5
      # t.string :hour5temp
      # t.string :feelslike5
      # t.string :chanceofrain5
      # t.string :hour6
      # t.string :hour6temp
      # t.string :feelslike6
      # t.string :chanceofrain6
      # t.string :hour7
      # t.string :hour7temp
      # t.string :feelslike7
      # t.string :chanceofrain7
      # t.string :hour8
      # t.string :hour8temp
      # t.string :feelslike8
      # t.string :chanceofrain8
      t.string :date1
      t.string :hourly1, array: true, default: []
      t.string :date2
      t.string :hourly2, array: true, default: []
      t.string :astronomy1
      t.string :astronomy2

      t.timestamps
    end
  end
end

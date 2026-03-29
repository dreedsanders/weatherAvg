class CreateAverages < ActiveRecord::Migration[6.1]
  def change
    create_table :averages do |t|
      t.string :month
      t.string :avgmin
      t.string :avgdailyrain
      t.string :absmax

      t.timestamps
    end
  end
end

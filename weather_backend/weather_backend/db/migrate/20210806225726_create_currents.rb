class CreateCurrents < ActiveRecord::Migration[6.1]
  def change
    create_table :currents do |t|
      t.string :time
      t.string :weatherdescription
      t.string :temp
      t.string :feelslike

      t.timestamps
    end
  end
end

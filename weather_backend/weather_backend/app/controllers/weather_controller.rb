class WeatherController < ApplicationController
     def index 
        @lil_temps= Weather.new()
        @response = @lil_temps.temps
        @days = @response["data"]["weather"]
        @averages = @response["data"]["ClimateAverages"]
        @current = @response["data"]["current_condition"]
        @hourly1 = @days[0]["hourly"]
        @hourly2 = @days[1]["hourly"]
        
        

            #   HOW TO MAKE IT SO THAT IT ONLY CREATES A DAY IF THE DATE IS NOT ALREADY MADE
            # if Twoday.exists?(date1: !Date.today)
        Twoday.create(date1: Date.today, hourly1: @hourly1, date2: Date.tomorrow, hourly2: @hourly2, astronomy1: @days[0], astronomy2: @days[1] )
            # end

        #  ONLY NEED THE AVERAGES ONCE 
        @averages["month"].each do |month|
        Average.find_or_create_by(month: month["name"], avgmin: month["avgMinTemp_F"], avgdailyrain: month["avgDailyRainfall"], absmax: month["absMaxTemp_F"])
        end

        Current.create(time: @current["observation_time"], weatherdescription: @current["weatherDesc"], temp: @current["temp_F"], feelslike: @current["FeelsLikeF"])

        render json: @hourly1

    end
end

    

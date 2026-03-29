require 'httparty'
class Weather < ApplicationRecord

     include HTTParty
    base_uri "api.worldweatheronline.com/premium/v1/weather"

    def temps
      api_key = ENV.fetch("WORLD_WEATHER_ONLINE_API_KEY")
      self.class.get(".ashx?key=#{api_key}&q=30.404251,-97.849442&num_of_days=2&tp=8&format=xml")
    end


end

class TwodaysController < ApplicationController
    def index
        @twodays = Twoday.all 
        render json: @twodays
    end
end

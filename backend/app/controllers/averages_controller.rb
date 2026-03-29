class AveragesController < ApplicationController
    def index 
        @averages = Average.all
        render json: @averages
    end

end

class CurrentsController < ApplicationController
    def index
        @current = Current.all
        render json: @current
    end
    
end

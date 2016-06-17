class UiController < ApplicationController
  def show
    
  end
  
  def fake
    @fake ||= OpenStruct.new(:persisted? => false)
  end
  helper_method :fake
end

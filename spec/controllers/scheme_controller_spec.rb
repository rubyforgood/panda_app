require 'rails_helper'

RSpec.describe SchemeController, type: :controller do

  describe "GET #index" do
    it "ain't broke" do
      get :index
      expect(response).to have_http_status(:success).or(have_http_status(:redirect))
    end
  end

end

require 'rails_helper'

describe Api::ObservationSessionsController, type: :controller do
  let(:user) { FactoryGirl.create :user }

  before { sign_in user }

  describe '#create' do
    let(:scheme) do
      FactoryGirl.create :scheme, user: user
    end

    let(:request_body) do
      {
        observation_session: FactoryGirl.attributes_for(:observation_session)
      }
    end

    subject { post :create, request_body }

    let(:observation_session) { assigns(:observation_session) }

    it 'creates a session' do
      subject

      expect(response.status).to eq 201
      expect(observation_session).to be_persisted
    end

    it 'saves metadata' do
      skip
    end
  end
end

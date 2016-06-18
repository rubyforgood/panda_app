require 'rails_helper'

describe Api::ObservationSessionsController, type: :controller do
  describe '#create' do
    let(:scheme) do
      FactoryGirl.create :scheme, :behaviors, :subjects
    end

    let(:request_body) do
      {
        observation_session: {
          id: make_uuid,
          name: 'Animals',
          scheme_id: scheme.id,
          
        }
      }
    end

    it 'creates a session' do

    end

    it 'saves metadata' do

    end

    it 'returns 422 on error' do

    end
  end
end

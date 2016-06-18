require 'rails_helper'

describe SchemesController, type: :controller do
  before do
    sign_in FactoryGirl.create(:user)
  end

  def uuid
    SecureRandom.uuid
  end

  let(:request_body) do
    {
      scheme: {
        id: scheme_id,
        name: 'Gorillas',
        subjects_attributes: [
          {
            id: uuid,
            name: 'Ronnie',
            groups: ['males']
          }
        ],
        behaviors_attributes: [
          {
            id: uuid,
            name: 'Walking',
            type: 'state',
            target_type: 'self',
            mutually_exclusive: false
          }
        ]
      }
    }
  end

  describe '#create' do
    let(:scheme_id) { SecureRandom.uuid }

    subject { post :create, request_body }
    let(:scheme) { assigns(:scheme) }

    it 'creates some resources' do
      subject

      expect(response.status).to eq 201

      expect(scheme.name).to eq 'Gorillas'
      expect(scheme.behaviors.count).to eq 1
      expect(scheme.subjects.count).to eq 1
    end
  end

  describe '#show' do
    let(:scheme) do
      
    end

    it 'shows a scheme' do

    end
  end
end

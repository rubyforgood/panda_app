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
        observation_session: FactoryGirl.attributes_for(:observation_session, scheme_id: scheme)
      }
    end

    subject { post :create, request_body }

    let(:observation_session) { assigns(:observation_session) }

    it 'creates a session' do
      subject

      expect(response.status).to eq 201
      expect(observation_session).to be_persisted
    end

    context 'nested observations' do
      let(:scheme) { FactoryGirl.create :scheme, :behaviors, :subjects }

      let(:some_observation_attributes) do
        scheme.behaviors.map do |behavior|
          actor = scheme.subjects.sample
          FactoryGirl.attributes_for :observation, actor_id: actor.id, behavior_id: behavior.id
        end
      end

      let(:request_body) do
        {
          observation_session: FactoryGirl.attributes_for(:observation_session).merge(observations_attributes: some_observation_attributes)
        }
      end

      it 'allows nested observations' do
        subject

        expect(assigns(:observation_session).observations).not_to be_empty
      end
    end

    context 'idempotence' do
      let(:new_observation_session) { FactoryGirl.create :observation_session, scheme: scheme }

      let(:request_body) do
        {
          id: new_observation_session.id,
          observation_session: new_observation_session
            .attributes
            .merge(name: 'Not the original')
        }
      end

      before { new_observation_session }

      it 'behaves like upsert' do
        subject

        expect(assigns(:observation_session).name).to eq 'Not the original'
      end
    end

    it 'saves metadata' do
      skip
    end
  end
end

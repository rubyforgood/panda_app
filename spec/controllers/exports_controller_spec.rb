require 'rails_helper'

describe Api::ExportsController, type: :controller do
  let(:user) { create :user }

  before { sign_in user }

  describe '#create' do
    let(:scheme) do
      create :scheme, user: user
    end

    let(:observation_session) do
      create(:observation_session, scheme_id: scheme)
    end

    let(:request_body) do
      {
        observation_session_id: observation_session.id,
        export: {
          subject: 'something',
          email: 'foo@bar.com'
        }
      }
    end

    subject { post :create, request_body }

    it 'successfully emails' do
      expect(ExportMailer).to receive(:export_email)
      subject

      expect(response.status).to eq 200
    end

    it 'returns 422 for failure' do
      allow(ExportMailer).to receive(:export_email).and_raise(Mailgun::Error)
      subject

      expect(response.status).to eq 422
    end
  end
end

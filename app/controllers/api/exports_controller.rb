module Api
  class ExportsController < ApplicationController
    def create
      csv_data = ObservationExporter.generate_observation_csv(observation_session)
      email = params[:email_address] || current_user.email

      ExportMailer.export_email(email, params[:subject], csv_data)
      head 200
    rescue Mailgun::Error
      head 422
    end

    private

    def observation_session
      ObservationSession.find(params[:observation_session_id])
    end
  end
end

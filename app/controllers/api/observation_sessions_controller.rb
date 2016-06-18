module Api
  class ObservationSessionsController < ApplicationController
    def create
      @observation_session = ObservationSession.create(create_params)

      if @observation_session
        head 201
      else
        head 422
      end
    end

    def show
      @observation_session = ObservationSession.find(observation_session_id)
    end

    def index
    end

    private

    def observation_session_id
      params.require(:id)
    end

    def create_params
      filtered_create_params.merge(metadata: extracted_metadata, user: current_user)
    end

    def filtered_create_params
      params
        .require(:observation_session)
        .permit(:id, :name, :observation_method,
                :session_interval_seconds, :session_duration_seconds,
                :started_at, :focal_animal_id, :focal_behavior_id,
                :scheme_id, :notes, :metadata)
    end

    def extracted_metadata
      params.dig(:observation_session, :metadata)
    end
  end
end

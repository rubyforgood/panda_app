module Api
  class ObservationSessionsController < ApplicationController
    def create
      @observation_session = ObservationSession.find_or_initialize_by(id: id_or_nil)
      @observation_session.assign_attributes(create_params)

      if @observation_session.save
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

    def id_or_nil
      params.permit(:id)[:id]
    end

    def observation_session_id
      params.require(:id)
    end

    def create_params
      filtered_create_params.merge(metadata: extracted_metadata, user_id: current_user.id)
    end

    def filtered_create_params
      params
        .require(:observation_session)
        .permit(:id, :name, :observation_method,
                :session_interval_seconds, :session_duration_seconds,
                :started_at, :focal_animal_id, :focal_behavior_id,
                :scheme_id, :notes, :metadata,
                observations_attributes: [
                  :started_at, :event_type, :duration_seconds,
                  :time_lag_seconds, :notes,
                  :behavior_id, :actor_id, :receiver_id, :id,
                  modifiers: []
                ]
               )
    end

    def extracted_metadata
      params.dig(:observation_session, :metadata)
    end
  end
end

module Api
  class ObservationSessionsController < ApplicationController
    def create
      @observation_session = ObservationSession.create(
        create_params.merge(user_id: current_user.id)
      )

      if @observation_session
        head(201)
      else
        head(422)
      end
    end

    def show
    end

    def index
    end

    private

    def create_params
      params
        .require(:observation_session)
        .permit(:id, :name, :observation_method,
                :session_interval_seconds, :session_duration_seconds,
                :started_at, :focal_animal_id, :focal_behavior_id,
                :scheme_id, :notes, :metadata)
    end

  end
end

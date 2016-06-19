module Api
  class ObservationsController < ApplicationController
    def create
      observation = Observation.create(create_params)

      if observation
        head 201
      else
        head 422
      end
    end

    def update
      observation = Observation.find(observation_id)

      if observation.update_attributes(update_params)
        head 200
      else
        head 422
      end
    end

    private

    def observation_id
      params.require(:id)
    end

    def update_params
      params.require(:observation).permit(:notes)
    end

    def create_params
      params
        .require(:observation)
        .permit(:started_at, :event_type, :duration_seconds,
                :time_lag_seconds, :notes, :observation_session_id,
                :behavior_id, :actor_id, :receiver_id, :id,
                modifiers: [])
    end
  end
end

class ObservationExporter
  def self.generate_observation_csv(observation_session)
    headers.concat(observation_session.observations
      .map {|observation| row(observation) }
      .join("\n"))
  end

  private
  def self.headers
    "started at, event type, duration, time lag (s), modifiers, notes, behavior, actor, receiver\n"
  end

  def self.row(observation)
    [observation['started_at'],
    observation['event_type'],
    observation['duration_seconds'],
    observation['time_lag_seconds'],
    observation['modifiers']&.join(' '),
    observation['notes'],
    Behavior.find(observation['behavior_id'])&.name,
    Subject.find(observation['actor_id'])&.name,
    Subject.where(id: observation['receiver_id']).first&.name].join(',')
  end
end

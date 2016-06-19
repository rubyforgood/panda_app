class ObservationExporter
  def self.generate_observation_csv(observation_session)
    csv_column_headers.concat(observation_session.observations
      .map {|observation| observation_to_csv_row(observation) }
      .join("\n"))
  end

  private

  def self.csv_column_headers
    [
      "started at",
       "event type",
       "duration",
       "time lag (s)",
       "modifiers",
       "notes",
       "behavior",
       "actor",
       "receiver\n"
    ].join(',')
  end

  def self.observation_to_csv_row(observation)
    [
      observation['started_at'],
      observation['event_type'],
      observation['duration_seconds'],
      observation['time_lag_seconds'],
      observation['modifiers']&.join(' '),
      observation['notes'],
      Behavior.find(observation['behavior_id'])&.name,
      Subject.find(observation['actor_id'])&.name,
      Subject.where(id: observation['receiver_id']).first&.name
    ].join(',')
  end
end

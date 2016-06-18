## API

All requests can be authenticated by a signed cookie with the session ID.

### POST /observation_sessions
Start a new observation session.

Request:
```
{
  session_id: uuid,
  name: 'name',
  observation_method: 'focal_animal',
  focal_animal_name: 'tarzan',
  focal_behavior_id: null,
  session_interval_seconds: '100',
  session_interval_duration: '15000',
 
  scheme_id: uuid,
  notes: 'thing',

  // extra metadata
  metadata: {
  	anything, will be stored as json
  }
}
```

Response:

```
Headers:
X-Session-Id=YourResourceKey

or

{
  session: {
    id: your_resource_key
  }
}
```

### PATCH /observation_sessions/:id
Start or finish the session.

```
{
  session: {
    state: 'finished' // (start|finish)
  }
}
```

### GET /schemes
Get the schemes created by this user
```
{
  schemes: [
    { name: 'scheme1', id: uuid }
  ]
}
```

### GET /schemes/:id
Get the active scheme for this observation session.
```
{
  subjects: [
    { id: 'abcd-1234-beef', name: 'tarzan', groups: ['humans'] },
    { id: 'abcd-1234-beed', name: 'jane', groups: [] }
  ],
  behaviors: [
    {
      id: 'abcd-1234',
      name: 'walking',
      type: 'state'
      parent_behavior_id: null,
      target: 'none',
      exclusive: false,
      modifiers: ['peaceful', 'agitated']
    },
    {
      id: 'abcd-1234',
      name: 'standing',
      type: 'state'
      exclusive: true,
      modifiers: ['peaceful', 'agitated'],
      parent_behavior_id: null
    },
    {
      uuid: 'abcd-1234',
      name: 'pointing',
      type: 'event',
      parent_behavior_id: null,
      modifiers: []
    }
  ]
}
```

### POST/PUT /scheme
Create a new observation scheme.

```
{
  scheme: {
    uuid: '1234-abcd',
    subjects_attributes: [
      { id: 'abcd-1234', name: 'tarzan', groups: ['humans'] },
      { id: 'abcd-1234', name: 'jane', groups: [] }
    ],
    behaviors_attributes: [
      {
        id: 'abcd-1234',
        name: 'aggression',        // string
        type: 'event',             // string (event|state)
        target_type: 'other',      // string (other|none|self)
        mutually_exclusive: false  // boolean or null
        parent_behavior_id: null // or uuid
      },
      {
        name: 'biting',        // string
        type: 'event',           // string (event|state)
        target_type: 'other',    // string (other|none|self)
        mutually_exclusive: false // boolean or null
        parent_behavior_id: uuid
      }
    ]
  }
}
```

### DELETE /scheme/:id
Delete a scheme

### POST /observations
Create a new observation.
```
{
  observation: {
    id: uuid,
    observation_session_id: uuid,
    event_type: 'event', // event or state
    behavior_id: uuid,
    started_at: '12:03:01'
    duration_seconds: 12,
    time_lag_seconds: 15.0,
    actor_id: uuid,
    receiver_id: uuid,
    modifiers: ['happy', 'sad'],
    notes: 'something'
  }
}
```

### POST /observation_sessions/:id/export
Export your results to a CSV and email it.

Request:
```
{
	export: {
		subject_line: 'something',
		body: 'something else'
		email_address: 'foo@bar.com'
	}	
}
```


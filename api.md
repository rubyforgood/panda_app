## API

All requests can be authenticated by a signed cookie with the session ID.

### POST /session
Start a new observation session.

Request:
```
{
  name: 'name',
  observation_method: 'focal_animal',
  focal_animal_name: 'tarzan',
  focal_behavior_id: null,
  session_interval_seconds: '100',
  session_interval_duration: '15000',
 
  scheme_id: 1234,
  notes: 'thing',

  // extra metadata
  location: {
    lat, long
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

### PATCH /session
Start or finish the session.

```
{
  session: {
    state: 'finished' // (start|finish)
  }
}
```

### GET /:user_id/schemes
Get the schemes created by this user
```
{
  schemes: [
    { name: 'scheme1', id: 1 }
  ]
}
```

### GET /schemes/:id
Get the active scheme for this observation session.
```
{
  subjects: [
    { uuid: 'abcd-1234-beef', name: 'tarzan', groups: ['humans'] },
    { uuid: 'abcd-1234-beed', name: 'jane', groups: [] }
  ],
  behaviors: [
    {
      uuid: 'abcd-1234',
      name: 'walking',
      type: 'state'
      parent_behavior_id: null,
      target: 'none',
      exclusive: false,
      modifiers: ['peaceful', 'agitated']
    },
    {
      uuid: 'abcd-1234',
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
      { uuid: 'abcd-1234', name: 'tarzan', groups: ['humans'] },
      { uuid: 'abcd-1234', name: 'jane', groups: [] }
    ],
    behaviors_attributes: [
      {
        uuid: 'abcd-1234',
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
Delete a schema

### POST /session/observations
Create a new observation.
```
{
  observation: {
    uuid: 'abcd-1234',
    event_type: 'event', // event or state
    behavior_name: 'pointing',
    started_at: '12:03:01'
    duration_seconds: 12,
    time_lag_seconds: 15.0,
    actor_uuid: uuid,
    receiver_uuid: uuid,
    modifiers: ['happy', 'sad'],
    notes: 'something'
  }
}
```

### POST /session/export
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


## API

All requests can be authenticated by a signed cookie with the session ID.

### POST /session
Start a new observation session.

Request:
```
{
  name: 'name',
  methodology: {
    observation_type: 'focal_animal',
    focal_animal: 'tarzan',
    interval_seconds: '100'
  }

  note: 'thing',

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

### GET /session/schema
Get the active schema for this observation session.
```
{
  subjects: [
    { name: 'tarzan', groups: ['humans'] },
    { name: 'jane', groups: [] }
  ],
  behaviors: [
    {
      name: 'walking',
      type: 'state'
      group: 'posture',
      target: 'none',
      exclusive: false,
      modifiers: ['peaceful', 'agitated']
    },
    {
      name: 'standing',
      type: 'state'
      group: 'posture',
      exclusive: true,
      modifiers: ['peaceful', 'agitated']
    },
    {
      name: 'pointing',
      type: 'event',
      group: 'actions',
      modifiers: []
    }
  ]
}
```

### POST/PUT /session/schema
Create a new observation schema.

TODO: What should creating subject groups look like?
```
{
	schema: {
		subjects: [
			'tarzan', 'jane'
		],
		
		behaviors: [
			{
				name: 'pointing',         // string
				type: 'event',            // string (event|state)
				target_type: 'other',     // string (other|none|self)
				group: 'actions',         // string or null
				mutually_exclusive: false // boolean or null
			},
		]
	}
}
```

### PATCH /session/schema/behaviors/:name
Update a defined behavior.

```
request omitted
```

### POST /session/observations
Create a new observation.
```
{
  observation: {
    behavior: 'pointing',
    type: 'event',
    duration: 12,
    subject: 'tarzan',
    time: '12:03:01'
    relative_time: '00:01:01',
    target: 'jane',
    note: 'something'
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


## API


### GET /session/schema

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
      type: 'none',
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

### POST /session

```
{
  observation_method: 'focal_animal',
  name: 'name',
  methodology: {
    observation_type: 'focal_animal',
    focal_animal: 'tarzan',
    interval: '100'
  }

  note: 'thing',

  location: {
    lat, long
  }
}
```

### POST /session/observation

Request:
```
{
  observation: {
    behavior: 'pointing',
    event_type: 'event',
    duration: 12,
    subject: 'tarzan',
    time: '12:03:01'
    relative_time: '00:01:01',
    target: 'jane',
    note: 'something'
  }
}
```

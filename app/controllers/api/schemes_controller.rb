class SchemesController < ApplicationController
  def show
    render json: {
      scheme: {
        name:   "an amazing scheme",
        locked: false,
        subjects: [
          { name: "Anna", groups: ['humans'] },
          { name: "Bob", groups: ['humans'] },
          { name: "Catherine", groups: [] }
          { name: "David", groups: ['pandas']}
        ],
        behaviors: [
          {
            name: 'walking',
            type: 'state',
            mutually_exclusive: true,
            target: 'none'
          },
          {
            name: 'running',
            type: 'state',
            mutually_exclusive: true,
            target: 'none'
          },
          {
            name: 'fighting',
            type: 'state',
            mutually_exclusive: true,
            target: 'other'
          }
        ]
      }
    }
  end
end

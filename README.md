# Panda App

## Setup

### System Requirements
- Ruby 2.3.1
- Postgresql 9.5
- bundler gem


### Initial Setup
- Clone this repo
` git clone git@github.com:rubyforgood/panda_app.git`
- cd into the folder for the repo `cd panda_app`
- bundle `bundle install`
- setup the database `rake db:create`
- To serve the app locally `rails server`

### Tests
 Run the test suite with `bundle exec rspec`

## The Stack
- Ruby 2.3
- Rails 4.2
- RSpec
- Postgres 9.5
- Puma
- TravisCI


## Deployment
The TravisCI automagically deploy to the app to panda-app.herokuapp.com when a build on the *master* branch passes.

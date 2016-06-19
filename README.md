# Panda App

## Ruby for Good
This is a 2016 [Ruby for Good](http://rubyforgood.org/) project.
## Goal
We are building a web app for use on phones and tables that will help researchers record observations of animal behavior and output the data in csv form.
### Major Features
- User creation and authentication
- Observation Schema Creation - define the behaviors and subjects being observed before observations start
- Sessions - Combine schema with rules for particular methods and metadata (start time, location, etc)
- Observation Collection - A real time mode for collecting observations, this part needs to be responsive
- Data export - Covert the data to csv form and get it onto the researchers computers (email is preferable)

### Quick Links
- [waffle board](https://waffle.io/rubyforgood/panda_app)

## Setup

### System Requirements
- Ruby 2.3.1
- Postgresql 9.5
- bundler gem
- node (4.x or greater)

### Initial Setup
- Clone this repo
` git clone git@github.com:rubyforgood/panda_app.git`
- cd into the folder for the repo `cd panda_app`
- bundle `bundle install`
- install node packages `npm install`
- install mocha for js tests `npm install -g mocha`
- setup the database `rake db:create`
- To serve the app locally `rails server`

### Tests
- Run the rails test suite with `bundle exec rspec`
- Run the javascript tests with `mocha app/assets/javascripts/tests/`

## The Stack
- Ruby 2.3
- Rails 4.2
- RSpec
- Postgres 9.5
- Puma
- TravisCI


## Deployment
TravisCI automagically deploys the master branch to [panda-app.herokuapp.com](panda-app.herokuapp.com) when a build on the *master* passes.

# Workflow

1.  Select an open issue to work on, create an issue if there isn't one
- Make sure you local master branch is up to date with master on github
```
git checkout master && git pull origin master
```
- Create a feature branch, include the issue number
```
git checkout -b branch_name
```
- Write code (and tests)
- Push your branch to github
```
git push -u origin branch_name
```
- Open a pull request on github, please have at least one team member review it and give it a :thumbsup:
- Merge into master - this will trigger a deploy if the tests pass

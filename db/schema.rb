# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160618140256) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "observations", force: :cascade do |t|
    t.integer  "session_id",                    null: false
    t.datetime "started_at",                    null: false
    t.string   "event_type",                    null: false
    t.float    "duration_seconds"
    t.float    "time_lag_seconds"
    t.integer  "behavior_id"
    t.integer  "actor_id"
    t.integer  "receiver_id"
    t.text     "modifiers",        default: [],              array: true
    t.text     "notes"
  end

  add_index "observations", ["session_id"], name: "index_observations_on_session_id", using: :btree

  create_table "schemes", force: :cascade do |t|
    t.json "scheme_json"
    t.text "uuid"
  end

  create_table "sessions", force: :cascade do |t|
    t.integer  "user_id",                  null: false
    t.integer  "scheme_id",                null: false
    t.string   "name"
    t.string   "observation_method"
    t.integer  "focal_animal_id"
    t.integer  "focal_behavior_id"
    t.float    "session_interval_seconds"
    t.float    "session_duration_seconds"
    t.datetime "started_at"
    t.datetime "finished_at"
    t.json     "metadata"
    t.text     "notes"
  end

end

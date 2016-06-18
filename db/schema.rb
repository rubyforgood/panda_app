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
    t.uuid "uuid"
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

  create_table "users", force: :cascade do |t|
    t.string   "email",                            null: false
    t.datetime "created_at",                       null: false
    t.datetime "updated_at",                       null: false
    t.string   "encrypted_password",  default: "", null: false
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",       default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.string   "provider"
    t.string   "uid"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree

end

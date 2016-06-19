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

ActiveRecord::Schema.define(version: 20160618161555) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "uuid-ossp"

  create_table "behaviors", id: :uuid, default: "uuid_generate_v4()", force: :cascade do |t|
    t.string  "name",                               null: false
    t.string  "type",                               null: false
    t.boolean "mutually_exclusive", default: false
    t.text    "modifiers",          default: [],                 array: true
    t.uuid    "scheme_id",                          null: false
    t.uuid    "parent_behavior_id"
    t.string  "target_type",                        null: false
  end

  add_index "behaviors", ["scheme_id", "name"], name: "index_behaviors_on_scheme_id_and_name", unique: true, using: :btree

  create_table "observation_sessions", id: :uuid, default: "uuid_generate_v4()", force: :cascade do |t|
    t.integer  "user_id",                  null: false
    t.string   "name"
    t.string   "observation_method"
    t.float    "session_interval_seconds"
    t.float    "session_duration_seconds"
    t.datetime "started_at"
    t.datetime "finished_at"
    t.json     "metadata"
    t.text     "notes"
    t.uuid     "scheme_id"
    t.uuid     "focal_animal_id"
    t.uuid     "focal_behavior_id"
  end

  create_table "observations", id: :uuid, default: "uuid_generate_v4()", force: :cascade do |t|
    t.datetime "started_at",                          null: false
    t.string   "event_type",                          null: false
    t.float    "duration_seconds"
    t.float    "time_lag_seconds"
    t.text     "modifiers",              default: [],              array: true
    t.text     "notes"
    t.uuid     "observation_session_id",              null: false
    t.uuid     "behavior_id",                         null: false
    t.uuid     "actor_id"
    t.uuid     "receiver_id"
  end

  add_index "observations", ["observation_session_id"], name: "index_observations_on_observation_session_id", using: :btree

  create_table "schemes", id: :uuid, default: "uuid_generate_v4()", force: :cascade do |t|
    t.integer "user_id",                     null: false
    t.string  "name",                        null: false
    t.text    "subject_groups", default: [],              array: true
  end

  add_index "schemes", ["id", "user_id", "name"], name: "index_schemes_on_id_and_user_id_and_name", unique: true, using: :btree

  create_table "subjects", id: :uuid, default: "uuid_generate_v4()", force: :cascade do |t|
    t.string "name",                   null: false
    t.text   "groups",    default: [],              array: true
    t.uuid   "scheme_id"
  end

  add_index "subjects", ["scheme_id", "name"], name: "index_subjects_on_scheme_id_and_name", unique: true, using: :btree

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

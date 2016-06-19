module Api
  class SchemesController < ApplicationController
    before_action :load_scheme, only: [:show, :update]

    def create
      @scheme = Scheme.build_with_associations(
                            scheme_params.merge(user_id: current_user.id),
                            new_associations: {
                              subjects: subject_params,
                              behaviors: behaviors_params })

      if @scheme.save
        head 201
      else
        head 422
      end
    end

    def show
    end

    def index
      @schemes = Scheme.all
    end

    private

    def scheme_id
      params.require(:id)
    end

    def load_scheme
      @scheme = Scheme.find scheme_id
    end

    def scheme_params
      params.require(:scheme).permit(:id, :name)
    end

    def subject_params
      params
        .require(:scheme)
        .permit(:subjects_attributes => [:id, :name, groups: []])[:subjects_attributes]
    end

    def behaviors_params
      params.require(:scheme).permit(:behaviors_attributes => [:id, :name, :type, :target_type, :mutually_exclusive, :parent_behavior_id])[:behaviors_attributes]
    end
  end
end

class SchemesController < ApplicationController
  def create
    uuid = params[:scheme][:uuid]
    scheme_json = params[:scheme]
    @scheme = Scheme.create(uuid: uuid, scheme_json: scheme_json)
    render json: @scheme
  end

  def show
    uuid = params[:id]
    @scheme = Scheme.where(uuid: uuid).first
    render json: @scheme
  end
end

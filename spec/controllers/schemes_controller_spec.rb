require 'spec_helper'

describe SchemesController, type: :controller do
  describe 'POST #create' do
    it 'should create a scheme' do
      expect(Scheme.count).to eq(0)
      params = {
        scheme: {
          uuid: '1234-abcd',
          subjects_attributes: [
            { uuid: 'abcd-1234', name: 'tarzan', groups: ['humans'] },
            { uuid: 'abcd-1234', name: 'jane', groups: [] }
          ],
          behaviors_attributes: [
            {
              uuid: 'abcd-1234',
              name: 'aggression',
              type: 'event',
              target_type: 'other',
              category: 'actions',
              mutually_exclusive: false,
              parent_behavior: nil
            },
            {
              name: 'biting',
              type: 'event',
              target_type: 'other',
              category: 'actions',
              mutually_exclusive: false,
              parent_behavior: 'abcd-1234'
            }
          ]
        }
      }
      post :create, params

      expect(Scheme.count).to eq(1)
      expect(Scheme.first.scheme_json).to eq(JSON.parse(params[:scheme].to_json))
      expect(Scheme.first.uuid).to eq(params[:scheme][:uuid])
    end
  end

  it 'should show a scheme' do
    scheme = Scheme.create(uuid: '1234-abcd', scheme_json: { scheme: 'skeeeem', uuid: '1234-abcd' })
    get :show, id: '1234-abcd'

    expect(assigns(:scheme)).to eq(scheme)
  end
end

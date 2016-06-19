const expect = require('chai').expect;
const EditableItem = require('../../../components/scheme/editable_item.js');

describe('EditableItem', function() {
  it('renders parent div with expected class', function() {
    const args = {
      namespace: 'scheme',
      item: 'test',
      text: 'Test',
      index: 1
    };
    const output = EditableItem.view(EditableItem.controller(args));
    const expectedClass = `${args.namespace}_${args.item}_${args.index}`;
    
    expect(output.attrs.className).to.include(expectedClass)
  });
});

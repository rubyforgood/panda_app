var m = require('mithril');

const CheckboxGroup = {
  controller: function (args) {
    return {
      divText: args.divText,
      collection: args.collection,
      associations: args.associations,
      namespace: args.namespace,
      item: args.item,
      attribute: args.attribute,
      id: function() {
        return `${this.namespace}_${this.item}`
      },
      name: function() {
        return `${this.namespace}[${this.item}][${this.attribute}]`
      },
      toggleAssociation: function(target) {
        if (target.checked) {
          let addItem = this.collection.find(function(item){ return item.uuid === target.value });
          this.associations.push(addItem);
        } else {
          let index = target.id;
          this.associations.slice(index, 1)
        }
      }
    }
  },
  view: function (ctrl) {
    return <div class="control-group">
      {ctrl.divText}
      {ctrl.collection.map((item, index) => {
        return <label>
          <input
            type="checkbox"
            value={item.uuid}
            id={`${ctrl.id()}_${index}`}
            name={`${ctrl.name()}`}
            checked={ctrl.associations.includes(item)}
            onchange={(e)=> { ctrl.toggleAssociation(e.target) }}
          />
          {item.name}
        </label>
      })}
    </div>
  }
};

module.exports = CheckboxGroup;

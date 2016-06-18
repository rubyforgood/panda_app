const uuid = require('node-uuid');
const mithril = require('mithril');

const Scheme = function(params) {
  params = params || {};
  this.name      = params.name || "";
  this.locked    = params.locked || false;
  this.subjects  = [];
  this.behaviors = [];
  this.uuid      = params.uuid || uuid.v1();

  // this.ensureUuids = () => {
  //   this.uuid = this.uuid || uuid.v1();
  //   this.behaviors.forEach((behavior) => {
  //     behavior.uuid = behavior.uuid || uuid.v1();
  //   });
  //   this.subjects.forEach((subject) => {
  //     subject.uuid = subject.uuid || uuid.v1();
  //   })
  // }

  this.addBlankSubject = (() => {
    this.subjects.push({
      // uuid: uuid.v1(),
      name: "",
      groups: []
    });
  });

  this.addBlankBehavior = (() => {
    mithril.startComputation();
    console.log(this);
    this.behaviors.push({
      // uuid: uuid.v1(),
      name: ""
    });
    mithril.endComputation();
  });
}

module.exports = Scheme;

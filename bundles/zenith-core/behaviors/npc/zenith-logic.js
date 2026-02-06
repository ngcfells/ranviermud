// Example Ranvier Behavior
const ZenithParser = require('../../../src/ZenithParser');
module.exports = {
  listeners: {
    spawn: state => function () {
      const logic = this.getMeta('authoritative_logic');
      if (logic) ZenithParser.execute(logic, this, { state });
    },
    hit: state => function (damage, target) {
      const logic = this.getMeta('authoritative_logic');
      if (logic && logic.includes('ON_HIT')) {
         ZenithParser.execute(logic, this, { state, target, event: 'hit' });
      }
    }
  }
};
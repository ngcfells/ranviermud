'use strict';

module.exports = {
  id: 'magic_missile',
  name: 'Magic Missile',
  level: 1,
  school: 'evocation',
  descriptors: ['force'],
  castingTime: 'standard',
  range: 'medium',
  save: null, // no save
  spellResistance: true,
  cost: { spellSlot: 1 },

  run: state => function (caster, target) {
    const missiles = 1 + Math.floor((caster.level - 1) / 2);
    const damage = missiles * (1 + Math.floor(Math.random() * 4));

    target.damage(damage, caster, 'force');
    caster.room.say(`${caster.name} launches glowing darts of force at ${target.name}.`);
  }
};

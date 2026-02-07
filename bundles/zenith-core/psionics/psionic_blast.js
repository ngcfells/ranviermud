'use strict';

module.exports = {
  id: 'psionic_blast',
  name: 'Psionic Blast',
  level: 3,
  discipline: 'telepathy',
  cost: { powerPoints: 5 },
  save: 'will',
  descriptors: ['mind-affecting'],

  run: state => function (manifester, target) {
    const dc = 10 + 3 + Math.floor((manifester.getAttribute('intelligence') - 10) / 2);
    const saveRoll = state.Dice.roll('1d20') + target.getAttribute('will');

    if (saveRoll >= dc) {
      target.room.say(`${target.name} resists the psionic blast.`);
      return;
    }

    target.room.say(`${target.name} is stunned by a wave of psychic force!`);
    target.addEffect('stunned', { duration: 3 });
  }
};

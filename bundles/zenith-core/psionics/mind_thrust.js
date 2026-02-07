'use strict';

/**
 * Mind Thrust (Psionic Power)
 * d20-style:
 *  - Level: Psion/Wilder 1
 *  - Discipline: Telepathy
 *  - Target: One creature
 *  - Save: Will half
 *  - Power Points: 1 + augments
 *
 * Assumptions:
 *  - You have a Dice helper at state.Dice.roll('XdY')
 *  - You track power points on the manifester via attribute "powerPoints"
 *  - Target has a "will" save attribute
 *  - Damage type "psychic" is supported by your combat system
 */
module.exports = {
  id: 'mind_thrust',
  name: 'Mind Thrust',
  level: 1,
  discipline: 'telepathy',
  descriptors: ['mind-affecting', 'psionic'],
  cost: {
    // minimum PP to manifest
    powerPoints: 1,
  },

  /**
   * Augment model:
   *  - Base: 1 PP → 1d10 damage
   *  - +1 PP → +1d10 damage (up to whatever cap you decide)
   */
  getDamageDice(ppSpent) {
    const baseDice = 1;
    const extraDice = Math.max(ppSpent - 1, 0);
    const totalDice = baseDice + extraDice;
    return `${totalDice}d10`;
  },

  /**
   * Main execution
   *
   * @param {GameState} state
   * @returns {Function} (manifester, target, ppSpent)
   */
  run: state => function (manifester, target, ppSpent = 1) {
    if (!target || target.isNpc && target.isNpc() && target.isDead && target.isDead()) {
      manifester.say('Your mind thrust finds no purchase.');
      return;
    }

    // Ensure manifester has enough PP
    const currentPP = manifester.getAttribute('powerPoints') || 0;
    if (currentPP < ppSpent) {
      manifester.say('You lack the mental energy to manifest that power.');
      return;
    }

    // Spend PP
    manifester.setAttribute('powerPoints', currentPP - ppSpent);

    const damageDice = this.getDamageDice(ppSpent);
    const damageRoll = state.Dice.roll(damageDice);

    // Compute save DC: 10 + power level + key ability mod (INT by default)
    const intScore = manifester.getAttribute('intelligence') || 10;
    const intMod = Math.floor((intScore - 10) / 2);
    const dc = 10 + this.level + intMod;

    const targetWill = target.getAttribute('will') || 0;
    const saveRoll = state.Dice.roll('1d20') + targetWill;

    const room = manifester.room;
    room.say(`${manifester.name} focuses a lance of mental energy at ${target.name}.`);

    let finalDamage = damageRoll;
    if (saveRoll >= dc) {
      finalDamage = Math.floor(damageRoll / 2);
      target.say('You partially resist the mental assault!');
    } else {
      target.say('Your mind reels under the psychic onslaught!');
    }

    if (finalDamage <= 0) {
      return;
    }

    // Apply damage as "psychic" (you can map this to your own damage type)
    if (typeof target.damage === 'function') {
      target.damage(finalDamage, manifester, 'psychic');
    }

    room.say(`${target.name} takes ${finalDamage} psychic damage from the mind thrust.`);
  },
};

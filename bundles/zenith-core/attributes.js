'use strict';

module.exports = [
  //
  // CORE VITALS
  //
  { 
    name: 'health',
    base: 0,
    formula: { 
      requires: ['constitution'],
      fn: function (character, base) { 
        const conMod = Math.floor((character.getAttribute('constitution') - 10) / 2); // You will define hitDice on the class object, e.g. "d10" const hitDie = character.playerClass?.hitDie || 6; // default d6 if missing return hitDie + conMod; 
      }
    }
  },

  { name: 'powerPoints', base: 0 },
  { name: 'sanity', base: 100 },
  { name: 'stamina', base: 10 },
  { name: 'resolve', base: 5 },

  //
  // CORE 7 ABILITY SCORES (D&D 3.5E + BoEF)
  //
  { name: 'strength', base: 0 },
  { name: 'dexterity', base: 0 },
  { name: 'constitution', base: 0 },
  { name: 'intelligence', base: 0 },
  { name: 'wisdom', base: 0 },
  { name: 'charisma', base: 0 },
  { name: 'appearance', base: 0 },

  //
  // SAVING THROWS
  //
  { name: 'fortitude', base: 0 },
  { name: 'reflex', base: 0 },
  { name: 'will', base: 0 },

  //
  // ARMOR TYPES (FANTASY → MODERN → SCI-FI)
  //
  { name: 'armorKinetic', base: 0 },
  { name: 'armorBallistic', base: 0 },
  { name: 'armorEnergy', base: 0 },
  { name: 'damageReduction', base: 0 },
  { name: 'shielding', base: 0 },

  //
  // GENRE ATTRIBUTES
  //
  { name: 'tech', base: 0 },
  { name: 'pilot', base: 0 },
  { name: 'cyberTolerance', base: 0 },
  { name: 'radiationResist', base: 0 },
  { name: 'grit', base: 0 },
  { name: 'quickdraw', base: 0 },
  { name: 'luck', base: 0 },
  { name: 'reputation', base: 0 },
  { name: 'forcePoints', base: 0 },
  { name: 'destinyPoints', base: 0 },
  { name: 'corruption', base: 0 },

  //
  // LEGACY ATTRIBUTES (OPTIONAL)
  //
  { name: 'critical', base: 0 },
];

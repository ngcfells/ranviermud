module.exports = {
  id: 'wizard',
  name: 'Wizard',
  hitDie: 4,
  spellcasting: {
    ability: 'intelligence',
    spellSlots: {
      1: { 0: 3, 1: 1 },
      2: { 0: 4, 1: 2 },
      // etc.
    },
    spellList: ['magic_missile', 'shield', 'sleep']
  }
};

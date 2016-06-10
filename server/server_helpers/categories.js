const categories = {
  professional: {
    include: ['business', 'success'],
    exclude: [],
  },
  athletic: {
    include: ['basketball', 'football', 'soccer', 'baseball', 'surf', 'gym',
    'lifting', 'exercise', 'athlete', 'sports', 'sport', 'fitness', 'muscle', 'athletic'],
    exclude: [],
  },
  adventurous: {
    include: ['outdoor', 'outdoors', 'tourist', 'travel', 'festival', 'vacation', 'tropical',
    'beach'],
    exclude: [],
  },
  headshot: {
    include: ['portrait'],
    exclude: ['couple', 'many', 'family', 'group', 'friendship', 'two', 'three', 'four', 'togetherness'],
  },
};

module.exports = categories;
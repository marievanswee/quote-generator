const {createPathFilters, generateToken} = require('../utils/functions');

describe('createPathFilters function', () => {
  test('create url path from object', () => {
    expect(createPathFilters({
      limit: 1,
      maxLength: 100,
      minLength: 1,
      tags: 'Custom',
      author: 'Paul'
    })).toBe('?limit=1&author=Paul&maxLength=100&minLength=1&tags=Custom');
  })
})

describe('generateToken function', () => {
  test('create token', () => {
    expect(generateToken().length).toBeGreaterThan(0);
  })
});

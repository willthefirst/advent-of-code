/* eslint-disable no-undef */
module.exports = {
  roots: ['<rootDir>/2019', '<rootDir>/2020', '<rootDir>/shared'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};

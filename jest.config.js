module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
      '^.+\\.(t|j)s$': 'ts-jest',
    },
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: './src',
    testRegex: '.*\\.(spec|test)\\.ts$', 
    collectCoverageFrom: [
      'src/**/*.ts',
      '!src/**/*.module.ts',
      '!src/**/*.dto.ts',
      '!src/**/*.entity.ts',
    ],
  };
  
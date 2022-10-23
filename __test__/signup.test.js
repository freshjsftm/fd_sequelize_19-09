const request = require('supertest');
const app = require('../app');

const getUserData = () => ({
  firstName: 'Testname',
  lastName: 'Testsname',
  email: `test${Date.now()}@gmail.com`,
  password: 'Test123456',
  birthday: '1999-2-10',
  isMale: true,
});

describe('sign up tests', () => {
  test('user must be registered successfully', () => {});
});

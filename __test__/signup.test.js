const request = require('supertest');
const yup = require('yup');
const app = require('../app');
const db = require('../models');
const appRequest = request(app);

const getUserData = () => ({
  firstName: 'Testname',
  lastName: 'Testsname',
  email: `test${Date.now()}@gmail.com`,
  password: 'Test123456',
  birthday: '1999-2-10',
  isMale: true,
});
const user = getUserData();

const schemaUserResSuccess = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup
    .string()
    .email()
    .required(),
  birthday: yup.date(),
  isMale: yup.boolean(),
});
const schemaSignUpDataSuccess = yup.object({
  data: yup.array().of(schemaUserResSuccess),
});

afterAll(() => {
  return db.sequelize.close();
});

describe('sign up tests', () => {
  test('user must be registered successfully', async () => {
    const response = await appRequest.post('/api/users/').send(user);
    console.log(response);
    expect(response.statusCode).toBe(201);
    //expect(await schemaSignUpDataSuccess.isValid(response.body)).toBe(true);
    expect(schemaSignUpDataSuccess.isValidSync(response.body)).toBe(true);
  });
});

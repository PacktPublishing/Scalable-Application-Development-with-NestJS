import * as Chance from 'chance';
const chance = new Chance();

export const CREATE_USER_OPERATION_NAME = 'CreateUser';

export const CREATE_USER_MUTATION = `mutation CreateUser($createUserInput: CreateUserInput!) {
   createUser(createUserInput: $createUserInput) {
     id
     email
     name
   }
 }`;

export const generateCreateUserVariables = () => {
  return {
    createUserInput: {
      name: chance.name(),
      email: chance.email(),
    },
  };
};

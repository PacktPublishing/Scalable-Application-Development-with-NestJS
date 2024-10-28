import { Factory } from 'fishery';
import { User } from '../entities/users.entity';

type Post = {
  name: string;
  user: User & { [key: string]: any };
};

const sym = Symbol('a');

const userFactory = Factory.define<User>(({ sequence, onCreate, params }) => {
  onCreate((user) => user);
  params.name = params.name || 'Tester';

  return {
    id: sequence,
    name: 'Tester',
    address: '123 Test St',
    email: 'test@test.com',
  };
});

const postFactory = Factory.define<Post>(() => ({
  name: 'Post 1',
  user: userFactory.build(),
}));

export const user = userFactory.build({
  name: 'Tester 2',
  email: 'tester@wrong.com',
});

export const userWithSymbol = { ...userFactory.build(), [sym]: 'a' };

export const postFactoryResult = postFactory.build(
  {},
  { associations: { user: userWithSymbol } },
);

export const asyncUser = userFactory.create({
  name: 'Tester 3',
  email: 'test@test.com',
  address: '123 Test St',
  id: 1,
});

export const users = userFactory.buildList(3, {
  name: 'See This joke',
});

users[2].name = 'Tester 4';

export { userFactory };

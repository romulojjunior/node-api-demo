import db, { User } from '../src/data/models';
import CreateUserUC from '../src/domain/usecases/user/create-user-uc';

const usersInfo = [
  {
    name: 'user01',
    email: 'user01@email.com',
    password: '12341234',
    passwordConf: '12341234',
  },
  {
    name: 'user02',
    email: 'user02@email.com',
    password: '12341234',
    passwordConf: '12341234',
  },
  {
    name: 'user03',
    email: 'user03@email.com',
    password: '12341234',
    passwordConf: '12341234',
  }
];

async function createUser(): Promise<User[]> {
  const createUserUC = new CreateUserUC(db);
  const users = usersInfo.map(async (user) => {
    return createUserUC.execute({
      name: user.name,
      email: user.email,
      password: user.password,
      passwordConf: user.passwordConf,
    });
  });

  return await Promise.all(users);
}


async function main() {
  const users = await createUser();
  for(const user in users) {
    console.log(user);
  }
}

main();

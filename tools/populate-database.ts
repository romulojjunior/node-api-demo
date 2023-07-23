import { randomUUID } from "crypto";

import db, { User, Story } from '../src/data/models';
import CreateUserUC from '../src/domain/usecases/user/create-user-uc';
import CreateStoryUC from '../src/domain/usecases/stories/create-story-uc';
import MediaType from "../src/data/models/media-type";

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
  const usersPromise = usersInfo.map(async (user) => {
    return createUserUC.execute({
      name: user.name,
      email: user.email,
      password: user.password,
      passwordConf: user.passwordConf,
    });
  });

  return await Promise.all(usersPromise);
}


async function createStories(user: User): Promise<Story[]> {
  const createStoryUC = new CreateStoryUC(db);
  const uuid = randomUUID();

  const storiesPromises = [1, 2, 3, 4, 5].map((index: number) => {
    const userJSON = user.toJSON();
    return createStoryUC.execute({
      userId:   userJSON.id,
      title: `title-${index}-${uuid}`,
      description: `description-${index}-${uuid}`,
      mediaType: `${MediaType.image}`,
      mediaId: `mediaId-${uuid}`,
    });
  });

  return await Promise.all(storiesPromises);
}


async function main() {
  const users = await createUser();

  users.forEach(async (user: User) => {
    await createStories(user);
  });
}

main();

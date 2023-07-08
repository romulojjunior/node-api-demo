import { randomUUID } from "crypto";

export default function userFactory(params: { 
  name?: string, 
  email?: string, 
  password?: string, 
  passwordConf?: string
}) {
  const uuid = randomUUID();
  return {
    name: params.name ?? `nick-${uuid}`,
    email: params.email ?? `nick-${uuid}@mail.com`,
    password: params.password ?? '12341234',
    passwordConf: params.passwordConf ?? '12341234' 
  };
}
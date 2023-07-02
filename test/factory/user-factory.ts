import { randomUUID } from "crypto";

export default function userFactory(params: { 
  name?: string, 
  email?: string, 
  password?: string, 
  password_conf?: string
}) {
  const uuid = randomUUID();
  return {
    name: params.name ?? `nick-${uuid}`,
    email: params.email ?? `nick-${uuid}@mail.com`,
    password: params.password ?? '12341234',
    password_conf: params.password_conf ?? '12341234' 
  };
}
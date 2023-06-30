
export default function userFactory(params: { 
  name?: string, 
  email?: string, 
  password?: string, 
  password_conf?: string
}) {
  return {
    name: params.name ?? 'nick',
    email: params.email ?? 'nick@mail.com',
    password: params.password ?? '12341234',
    password_conf: params.password_conf ?? '12341234' 
  };
}
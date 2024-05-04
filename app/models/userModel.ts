export interface IUser {
  // name: string;
  email: string;
  password: string;
}
// export interface ILoginUser {
//   email: string;
//   password: string;
// }
export interface IRegisterUser {
  username: string;
  email: string;
  password: string;
}
export interface IContact {
  _id?: string;
  firstName: string;
  lastName: string;
  phone: string;
}

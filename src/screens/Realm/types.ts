export enum ERealmNames {
  user = 'User',
}

export type TUser = {
  _id: number
  name: string
  age: number
}

export type TUserProps = {
  data: TUser
}

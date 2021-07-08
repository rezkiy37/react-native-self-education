import Realm, { ObjectSchema, Object } from 'realm'
import { ERealmNames, TUser } from './types'

const UserSchema: ObjectSchema = {
  name: ERealmNames.user,
  properties: {
    _id: 'int',
    name: 'string',
    age: 'int',
    surname: {
      type: 'string',
      default: 'Surname',
    },
  },
  primaryKey: '_id',
}

const realm = new Realm({ schema: [UserSchema], schemaVersion: 6 })

const currentVersion = Realm.schemaVersion(Realm.defaultPath)
console.log('currentVersion', currentVersion)

const omitUsers = (users: Realm.Results<TUser & Realm.Object>): Array<TUser> =>
  users.map(({ name, age, _id }) => ({
    name,
    age,
    _id,
  }))

const getAllUser = (): Array<TUser> =>
  omitUsers(realm.objects<TUser>(ERealmNames.user))

const addUser = (user: Omit<TUser, '_id'>) => {
  realm.write(() => {
    const maxID = realm.objects(ERealmNames.user).max('_id') as number
    const isValidMaxID = Number.isInteger(maxID)
    realm.create<TUser>(ERealmNames.user, {
      _id: isValidMaxID ? maxID + 1 : Date.now(),
      ...user,
    })
  })
}

const deleteAllUsers = () => {
  realm.write(() => {
    realm.delete(realm.objects<TUser>(ERealmNames.user))
  })
}

const updateAllUsers = () => {
  realm.write(() => {
    const users = realm.objects<TUser>(ERealmNames.user)

    console.log('users', users)

    users.map(user => {
      console.log('user', user)
      console.log('user.age < 18', user.age < 18)

      if (user.age < 18) user.age = 18
    })
  })
}

const getAdultUsers = () =>
  omitUsers(realm.objects<TUser>(ERealmNames.user).filtered('age >= 18'))

export default realm

export { deleteAllUsers, getAdultUsers, updateAllUsers, getAllUser, addUser }

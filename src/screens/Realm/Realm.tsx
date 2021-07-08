import _, { lowerFirst } from 'lodash'
import React, { FC, useCallback, useEffect, useState } from 'react'
import {
  FlatList,
  ListRenderItem,
  SafeAreaView,
  TouchableHighlight,
  Text,
} from 'react-native'
import realm, {
  getAllUser,
  addUser,
  deleteAllUsers,
  updateAllUsers,
  getAdultUsers,
} from './db'
import { TUser } from './types'
import User from './User'

const RealmScreen: FC = () => {
  const [users, setUsers] = useState<Array<TUser>>(getAllUser())

  const renderItem = useCallback<ListRenderItem<TUser>>(
    ({ item }) => <User data={item} />,
    [],
  )

  const onPressDeleteAll = () => {
    deleteAllUsers()
  }

  const onPressUpdateAllUsers = () => {
    updateAllUsers()
  }

  const onPressGetAdultUsers = () => {
    console.info(
      'RealmScreen.onPressGetAdultUsers: getAdultUsers()',
      getAdultUsers(),
    )
  }

  const onPressAddUsers = () => {
    _.times(5).forEach(num => {
      addUser({ name: num.toString(), age: num })
    })
  }

  useEffect(() => {
    realm.addListener('change', () => {
      console.log('RealmScreen.useEffect[]: change', getAllUser())

      setUsers(getAllUser())
    })

    return () => {
      realm.removeAllListeners()
      realm.close()
    }
  }, [])

  return (
    <SafeAreaView>
      <TouchableHighlight onPress={onPressAddUsers}>
        <Text>Add users</Text>
      </TouchableHighlight>

      <TouchableHighlight onPress={onPressDeleteAll}>
        <Text>Delete all</Text>
      </TouchableHighlight>

      <TouchableHighlight onPress={onPressGetAdultUsers}>
        <Text>Get adult users</Text>
      </TouchableHighlight>

      <TouchableHighlight onPress={onPressUpdateAllUsers}>
        <Text>Update all users</Text>
      </TouchableHighlight>

      <FlatList
        data={users}
        keyExtractor={({ _id }) => `user-${_id}`}
        renderItem={renderItem}
      />
    </SafeAreaView>
  )
}

export default RealmScreen

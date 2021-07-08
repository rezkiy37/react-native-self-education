import React, { FC } from 'react'
import { View, Text } from 'react-native'
import { TUserProps } from './types'

const User: FC<TUserProps> = ({ data: { _id, name, age } }) => {
  return (
    <View>
      <Text>{_id}</Text>
      <Text>{name}</Text>
      <Text>{age}</Text>
    </View>
  )
}

export default User

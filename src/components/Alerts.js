import React from 'react'
import { Alert } from 'react-native'

const confirm = (title, message, action, key) => {
  Alert.alert(title, message, [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel pressed'),
      style: 'cancel'
    },
    {
      text: 'OK',
      onPress: () => action(key)
    }
  ])
}

export { confirm }

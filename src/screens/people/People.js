import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import MyStack from '../../components/Stack'

import { LogBox } from 'react-native'

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state'
])

const People = () => {
  const listScreens = [
    {
      key: 'List People'
    },
    {
      key: 'Create People'
    },
    {
      key: 'Edit People'
    }
  ]
  return (
    <NavigationContainer independent={true}>
      <MyStack listScreens={listScreens} />
    </NavigationContainer>
  )
}

export default People

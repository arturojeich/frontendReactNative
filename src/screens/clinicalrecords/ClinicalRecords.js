import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import MyStack from '../../components/Stack'

import { LogBox } from 'react-native'

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state'
])

const ClinicalRecords = () => {
  const listScreens = [
    {
      key: 'List Clinical Records'
    },
    {
      key: 'Create Clinical Record'
    },
    {
      key: 'Edit Clinical Record'
    }
  ]
  return (
    <NavigationContainer independent={true}>
      <MyStack listScreens={listScreens} />
    </NavigationContainer>
  )
}

export default ClinicalRecords

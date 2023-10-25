import React from 'react'
import { StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import Tabs from '../../components/Tabs'

const People = () => {
  const listTabs = [
    {
      key: 'List People'
    },
    {
      key: 'Create People'
    }
  ]
  return (
    <NavigationContainer independent={true}>
      <Tabs listTabs={listTabs} />
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: 'red',
    fontSize: 40
  }
})
export default People

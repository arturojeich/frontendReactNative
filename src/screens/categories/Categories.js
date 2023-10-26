import React from 'react'
import { StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import Tabs from '../../components/Tabs'

const Categories = () => {
  const listTabs = [
    {
      key: 'List Categories'
    },
    {
      key: 'Create Category'
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
    alignItems: 'center',
    backgroundColor: 'white'
  },
  text: {
    color: 'red',
    fontSize: 40
  }
})
export default Categories

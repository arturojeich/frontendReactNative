import React from 'react'
import { StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import Tabs from '../../components/Tabs'

const ClinicalRecords = () => {
  const listTabs = [
    {
      key: 'List Clinical Records'
    },
    {
      key: 'Create Clinical Record'
    },
    {
      key: 'Export Clinical Records'
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
export default ClinicalRecords

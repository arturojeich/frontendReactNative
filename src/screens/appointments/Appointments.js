import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { StyleSheet } from 'react-native'
import Tabs from '../../components/Tabs'

const Appointments = () => {
  const listTabs = [
    {
      key: 'List Appointments'
    },
    {
      key: 'Create Appointment'
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
export default Appointments

import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { SafeAreaView, Text, StyleSheet, View } from 'react-native'
import Tabs from '../../components/Tabs'
import { ListAppointments } from './ListAppointments'
import { CreateAppointment } from './CreateAppointment'
import { MaterialIcons } from '@expo/vector-icons'

// name={'TabOne'}
//         options={{
//           tabBarIcon: ({ focused }) => (
//             <Feather
//               name={'droplet'}
//               size={25}
//               color={focused ? 'black' : 'grey'}
//             />
//           )
//         }}

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

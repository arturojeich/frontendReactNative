import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'
import ClinicalRecords from '../screens/clinicalrecords/ClinicalRecords'
import Appointments from '../screens/appointments/Appointments'
import Categories from '../screens/categories/Categories'
import People from '../screens/people/People'

const Drawer = createDrawerNavigator()

const Drawers = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Appointments"
      screenOptions={{
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
          color: 'black'
        }
      }}
    >
      <Drawer.Screen
        name="Appointments"
        component={Appointments}
        options={{
          drawerIcon: () => (
            <MaterialIcons name="calendar-today" size={24} color="black" />
          )
        }}
      />
      <Drawer.Screen
        name="Categories"
        component={Categories}
        options={{
          drawerIcon: () => (
            <MaterialIcons name="category" size={24} color="black" />
          )
        }}
      />
      <Drawer.Screen
        name="Clinical Records"
        component={ClinicalRecords}
        options={{
          drawerIcon: () => (
            <MaterialIcons name="medical-services" size={24} color="black" />
          )
        }}
      />
      <Drawer.Screen
        name="People"
        component={People}
        options={{
          drawerIcon: () => (
            <MaterialIcons name="people" size={24} color="black" />
          )
        }}
      />
    </Drawer.Navigator>
  )
}

export default Drawers

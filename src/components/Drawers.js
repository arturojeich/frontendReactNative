import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import ClinicalRecords from '../screens/clinicalrecords/ClinicalRecords'
import Appointments from '../screens/appointments/Appointments'
import Categories from '../screens/categories/Categories'
import People from '../screens/people/People'
import {
  CustomStyles,
  CustomStyles as style
} from '../customStyles/CustomStyles'

const Drawer = createDrawerNavigator()

const Drawers = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Appointments"
      screenOptions={{
        headerStyle: {
          backgroundColor: style.colors.mainBackground
        },
        headerTitleStyle: {
          fontSize: 26,
          color: 'black'
        },
        drawerStyle: {
          backgroundColor: style.colors.mainBackground
        },
        drawerActiveBackgroundColor: style.colors.secondaryBackground,
        drawerActiveTintColor: style.colors.mainText
      }}
    >
      <Drawer.Screen
        name="Home"
        component={Appointments}
        options={{
          drawerIcon: () => (
            <MaterialCommunityIcons
              name="view-dashboard"
              size={54}
              color="black"
            />
          ),
          headerPressOpacity: 1,
          headerPressColor: style.colors.mainBackground,
          drawerActiveBackgroundColor: style.colors.mainBackground,
          drawerLabelStyle: {
            height: 80,
            alignSelf: 'center',
            fontSize: 35,
            textAlignVertical: 'center',
            color: 'black'
          }
        }}
      />
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

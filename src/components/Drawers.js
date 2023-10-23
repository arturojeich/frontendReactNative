import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import ClinicalRecords from '../screens/ClinicalRecords'
import Appointments from '../screens/Appointments'
import Categories from '../screens/Categories'
import People from '../screens/People'

const Drawer = createDrawerNavigator()

const Drawers = () => {
  return (
    <Drawer.Navigator initialRouteName="Appointments">
      <Drawer.Screen name="Appointments" component={Appointments} />
      <Drawer.Screen name="Categories" component={Categories} />
      <Drawer.Screen name="Clinical Records" component={ClinicalRecords} />
      <Drawer.Screen name="People" component={People} />
    </Drawer.Navigator>
  )
}

export default Drawers

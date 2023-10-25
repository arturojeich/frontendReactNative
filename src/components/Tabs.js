import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialIcons } from '@expo/vector-icons'
import { screenType } from '../utilities/ScreenType'

const Tab = createBottomTabNavigator()

const Tabs = ({ listTabs }) => {
  const tabs = listTabs.map(({ key }) => {
    return (
      <Tab.Screen
        key={key}
        name={screenType[key].name}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name={screenType[key].iconName}
              size={25}
              color={focused ? 'black' : 'grey'}
            />
          )
        }}
      >
        {screenType[key].location.default}
      </Tab.Screen>
    )
  })
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'grey',
        tabBarStyle: {
          backgroundColor: 'white'
        },
        headerStyle: {
          backgroundColor: 'white'
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 16,
          color: 'black'
        },
        headerTitleAlign: 'center'
      }}
    >
      {tabs}
    </Tab.Navigator>
  )
}

export default Tabs

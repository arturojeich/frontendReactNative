import React, { useState, useEffect } from 'react'
import {
  ScrollView,
  View,
  ActivityIndicator,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { app } from '../../../firebaseConfig'
import {
  getDatabase,
  ref,
  onValue,
  push,
  update,
  remove
} from 'firebase/database'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import CreatePeople from './CreatePeople'
import PeopleItem from '../../components/PeopleItem'
import { CustomStyles } from '../../customStyles/CustomStyles'

var db = null

const ListPeople = ({ navigation }) => {
  const [peopleList, setPeopleList] = useState({})
  const peopleKeys = Object.keys(peopleList)

  db = getDatabase(app)
  useEffect(() => {
    return onValue(ref(db, '/administracion/personas'), (querySnapShot) => {
      let data = querySnapShot.val() || {}
      let itemList = { ...data }
      setPeopleList(itemList)
    })
  }, [])

  function GetAllPeople() {
    return (
      <ScrollView>
        <View>
          {peopleKeys.length > 0 ? (
            peopleKeys.map((key) => (
              <PeopleItem
                key={key}
                peopleData={peopleList[key]}
                id={key}
                deleteFunction={deletePeople}
                getFunction={getPeople}
                navigation={navigation}
              />
            ))
          ) : (
            <ActivityIndicator size={'large'} color={`black`} />
          )}
        </View>
      </ScrollView>
    )
  }

  function FooterButtons() {
    return (
      <TouchableOpacity
        style={CustomStyles.createButton}
        onPress={() =>
          navigation.navigate('Agregar Persona', {
            db: null
          })
        }
      >
        <Text style={CustomStyles.createButtonText}>Nueva Persona</Text>
      </TouchableOpacity>
    )
  }

  function getPeople() {
    console.log('Get People')
  }

  function deletePeople(key) {
    console.log('Delete people, with KEY: ' + key)
    console.log(peopleList[key])
    remove(ref(db, `/administracion/personas/${key}`))
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GetAllPeople />
      <FooterButtons />
    </SafeAreaView>
  )
}

const forFade = ({ current, next }) => {
  const opacity = Animated.add(
    current.progress,
    next ? next.progress : 0
  ).interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 0]
  })

  return {
    leftButtonStyle: { opacity },
    rightButtonStyle: { opacity },
    titleStyle: { opacity },
    backgroundStyle: { opacity }
  }
}

const Stack = createStackNavigator()

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Lista de Personas"
        component={ListPeople}
        options={{
          headerTintColor: CustomStyles.colors.mainText,
          headerStyle: { backgroundColor: 'white' },
          headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen
        name="Agregar Persona"
        component={CreatePeople}
        options={{
          headerStyleInterpolator: forFade,
          headerTitleAlign: 'center'
        }}
      />
      {/* <Stack.Screen
        name="Editar Persona"
        options={{
          headerTintColor: CustomStyles.colors.mainText,
          headerStyle: { backgroundColor: 'white' },
          headerTitleAlign: 'center'
        }}
      >
        {(props) => <EditPeople {...props} db={db} />}
      </Stack.Screen> */}
    </Stack.Navigator>
  )
}

const People = () => {
  return (
    <NavigationContainer independent={true}>
      <MyStack />
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

import React, { useState, useEffect } from 'react'
import {
  ScrollView,
  View,
  ActivityIndicator,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Switch
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
import EditPeople from './EditPeople'
import SearchBar from '../../components/SearchBar'

var db = null

const ListPeople = ({ navigation }) => {
  const [searchPhrase, setSearchPhrase] = useState('')
  const [clicked, setClicked] = useState(false)
  const [search, setSearch] = useState(false)
  const [peopleList, setPeopleList] = useState({})
  const [isEnabledDoctors, setIsEnabledDoctors] = useState(true)
  const [isEnabledPatients, setIsEnabledPatients] = useState(true)
  const toggleSwitchDoctors = () =>
    setIsEnabledDoctors((previousState) => !previousState)
  const toggleSwitchPatients = () =>
    setIsEnabledPatients((previousState) => !previousState)

  const peopleKeys = Object.keys(peopleList)

  db = getDatabase(app)
  useEffect(() => {
    return onValue(ref(db, '/administracion/personas'), (querySnapShot) => {
      let data = querySnapShot.val() || {}
      let itemList = { ...data }
      setPeopleList(itemList)
    })
  }, [])

  // True -> Search, False -> Dont search
  function submitingText(value) {
    setSearch(value)
  }

  function searchText(text) {
    return text.includes(searchPhrase)
  }

  function GetAllPeople() {
    return (
      <ScrollView>
        <View>
          {peopleKeys.length > 0 ? (
            <>
              {peopleKeys.map((key) => {
                if (
                  (peopleList[key].es_doctor == true &&
                    isEnabledDoctors == true) ||
                  (peopleList[key].es_doctor == false &&
                    isEnabledPatients == true &&
                    (!search ||
                      (search &&
                        searchText(
                          `${peopleList[key].nombre} ${peopleList[key].apellido}`
                        ))))
                ) {
                  return (
                    <PeopleItem
                      key={key}
                      peopleData={peopleList[key]}
                      id={key}
                      deleteFunction={deletePeople}
                      getFunction={getPeople}
                      navigation={navigation}
                    />
                  )
                } else {
                  return null
                }
              })}
            </>
          ) : (
            <ActivityIndicator size={'large'} color={`black`} />
          )}
        </View>
      </ScrollView>
    )
  }

  function HeaderButtons() {
    return (
      <View>
        <View>
          <SearchBar
            searchPhrase={searchPhrase}
            setSearchPhrase={setSearchPhrase}
            clicked={clicked}
            setClicked={setClicked}
            submitingText={submitingText}
          />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View
            style={[
              CustomStyles.inputContainer,
              {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                width: '50%'
              }
            ]}
          >
            <Text style={[CustomStyles.label, { fontSize: 20, color: 'grey' }]}>
              Doctores
            </Text>
            <Switch
              trackColor={{ false: '#767577', true: '#767577' }}
              thumbColor={'white'}
              style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitchDoctors}
              value={isEnabledDoctors}
            />
          </View>
          <View
            style={[
              CustomStyles.inputContainer,
              {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                width: '50%'
              }
            ]}
          >
            <Text style={[CustomStyles.label, { fontSize: 20, color: 'grey' }]}>
              Pacientes
            </Text>
            <Switch
              trackColor={{ false: '#767577', true: '#767577' }}
              thumbColor={'white'}
              style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitchPatients}
              value={isEnabledPatients}
            />
          </View>
        </View>
      </View>
    )
  }

  function FooterButtons() {
    return (
      <TouchableOpacity
        style={CustomStyles.createButton}
        onPress={() => navigation.navigate('Agregar Persona')}
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
      <HeaderButtons />
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
        options={{
          headerStyleInterpolator: forFade,
          headerTitleAlign: 'center'
        }}
      >
        {(props) => <CreatePeople {...props} db={db} />}
      </Stack.Screen>
      <Stack.Screen
        name="Editar Persona"
        options={{
          headerTintColor: CustomStyles.colors.mainText,
          headerStyle: { backgroundColor: 'white' },
          headerTitleAlign: 'center'
        }}
      >
        {(props) => <EditPeople {...props} db={db} />}
      </Stack.Screen>
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

export default People

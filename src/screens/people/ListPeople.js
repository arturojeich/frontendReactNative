import React, { useState, useEffect } from 'react'
import {
  ScrollView,
  View,
  ActivityIndicator,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Switch
} from 'react-native'
import { app } from '../../../firebaseConfig'
import { getDatabase, ref, onValue, remove } from 'firebase/database'
import PeopleItem from '../../components/PeopleItem'
import { CustomStyles } from '../../customStyles/CustomStyles'
import SearchBar from '../../components/SearchBar'
import { MaterialIcons } from '@expo/vector-icons'


const ListPeople = ({ navigation }) => {
  const [dbFirebase, setDBFirebase] = useState(getDatabase(app))
  const [searchPhrase, setSearchPhrase] = useState('')
  const [clicked, setClicked] = useState(false)
  const [searchFlag, setSearchFlag] = useState(false)
  const [peopleList, setPeopleList] = useState({})
  const [isEnabledDoctors, setIsEnabledDoctors] = useState(true)
  const [isEnabledPatients, setIsEnabledPatients] = useState(true)
  const toggleSwitchDoctors = () =>
    setIsEnabledDoctors((previousState) => !previousState)
  const toggleSwitchPatients = () =>
    setIsEnabledPatients((previousState) => !previousState)

  const peopleKeys = Object.keys(peopleList)

  useEffect(() => {
    return onValue(
      ref(dbFirebase, '/administracion/personas'),
      (querySnapShot) => {
        let data = querySnapShot.val() || {}
        let itemList = { ...data }
        setPeopleList(itemList)
      }
    )
  }, [])

  function searchText(text) {
    return text.toLowerCase().includes(searchPhrase.toLowerCase())
  }

  function GetAllPeople() {
    return (
      <ScrollView>
        <View>
          {peopleKeys.length > 0 ? (
            <>
              {peopleKeys.map((key) => {
                if (
                  ((peopleList[key].es_doctor == true &&
                    isEnabledDoctors == true) ||
                    (peopleList[key].es_doctor == false &&
                      isEnabledPatients == true)) &&
                  (!searchFlag ||
                    (searchFlag &&
                      searchText(
                        `${peopleList[key].nombre.toLowerCase()} ${peopleList[
                          key
                        ].apellido.toLowerCase()}`
                      )))
                ) {
                  return (
                    <PeopleItem
                      key={key}
                      peopleData={peopleList[key]}
                      id={key}
                      deleteFunction={deletePeople}
                      getFunction={getPeople}
                      navigation={navigation}
                      db={dbFirebase}
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
            searchFlag={searchFlag}
            searchPhrase={searchPhrase}
            clicked={clicked}
            setSearchFlag={setSearchFlag}
            setSearchPhrase={setSearchPhrase}
            setClicked={setClicked}
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
        onPress={() =>
          navigation.navigate('Agregar Persona', {
            db: dbFirebase
          })
        }
      >
        <MaterialIcons name="add" size={60} color="white" />
      </TouchableOpacity>
    )
  }

  function getPeople() {
    console.log('Get People')
  }

  function deletePeople(key) {
    console.log('Delete people, with KEY: ' + key)
    console.log(peopleList[key])
    remove(ref(dbFirebase, `/administracion/personas/${key}`))
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderButtons />
      <GetAllPeople />
      <FooterButtons />
    </SafeAreaView>
  )
}

export default ListPeople

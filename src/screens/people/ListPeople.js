import React, { useState, useEffect } from 'react'
import { ScrollView, View, ActivityIndicator, SafeAreaView } from 'react-native'
import { app } from '../../../firebaseConfig'
import { getDatabase, ref, onValue } from 'firebase/database'
import PeopleItem from '../../components/PeopleItem'
import FooterOptions from '../../components/FooterOptions'
import FilterToggles from '../../components/FilterToggles'
import SearchBar from '../../components/SearchBar'

const ListPeople = ({ navigation }) => {
  const [dbFirebase, setDBFirebase] = useState(getDatabase(app))
  const [searchPhrase, setSearchPhrase] = useState('')
  const [clicked, setClicked] = useState(false)
  const [searchFlag, setSearchFlag] = useState(false)
  const [peopleList, setPeopleList] = useState({})
  const [isEnabledDoctors, setIsEnabledDoctors] = useState(true)
  const [isEnabledPatients, setIsEnabledPatients] = useState(true)
  const peopleKeys = Object.keys(peopleList)

  const toggleSwitchDoctors = () =>
    setIsEnabledDoctors((previousState) => !previousState)
  const toggleSwitchPatients = () =>
    setIsEnabledPatients((previousState) => !previousState)

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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <SearchBar
          searchFlag={searchFlag}
          searchPhrase={searchPhrase}
          clicked={clicked}
          setSearchFlag={setSearchFlag}
          setSearchPhrase={setSearchPhrase}
          setClicked={setClicked}
        />
        <FilterToggles
          isEnabledDoctors={isEnabledDoctors}
          isEnabledPatients={isEnabledPatients}
          toggleSwitchDoctors={toggleSwitchDoctors}
          toggleSwitchPatients={toggleSwitchPatients}
        />
      </View>
      <GetAllPeople />
      <FooterOptions
        navigation={navigation}
        db={dbFirebase}
        screenTypeName={'Agregar Persona'}
      />
    </SafeAreaView>
  )
}

export default ListPeople

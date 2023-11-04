import React, { useState, useEffect } from 'react'
import { ScrollView, View, ActivityIndicator, SafeAreaView } from 'react-native'
import { app } from '../../../firebaseConfig'
import { getDatabase, ref, onValue } from 'firebase/database'
import ClinicalRecordItem from '../../components/ClinicalRecordItem'
import FooterOptions from '../../components/FooterOptions'
import SearchBar from '../../components/SearchBar'

const ListClinicalRecords = ({ navigation }) => {
  const [dbFirebase, setDBFirebase] = useState(getDatabase(app))
  const [searchPhrase, setSearchPhrase] = useState('')
  const [clicked, setClicked] = useState(false)
  const [searchFlag, setSearchFlag] = useState(false)
  const [clinicalRecordsList, setClinicalRecordsList] = useState({})
  const [peopleList, setPeopleList] = useState({})
  const [categoriesList, setCategoriesList] = useState({})
  const [isEnabledDoctors, setIsEnabledDoctors] = useState(true)
  const [isEnabledPatients, setIsEnabledPatients] = useState(true)
  const clinicalRecordsKeys = Object.keys(clinicalRecordsList)
  const peopleKeys = Object.keys(peopleList)
  const categoriesKeys = Object.keys(categoriesList)

  const toggleSwitchDoctors = () =>
    setIsEnabledDoctors((previousState) => !previousState)
  const toggleSwitchPatients = () =>
    setIsEnabledPatients((previousState) => !previousState)

  useEffect(() => {
    return onValue(
      ref(dbFirebase, '/administracion/fichas'),
      (querySnapShot) => {
        let data = querySnapShot.val() || {}
        let itemList = { ...data }
        setClinicalRecordsList(itemList)
      }
    )
  }, [])

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

  useEffect(() => {
    return onValue(
      ref(dbFirebase, '/administracion/categorias'),
      (querySnapShot) => {
        let data = querySnapShot.val() || {}
        let itemList = { ...data }
        setCategoriesList(itemList)
      }
    )
  }, [])

  function searchText(text) {
    return text.toLowerCase().includes(searchPhrase.toLowerCase())
  }

  function GetAllClinicalRecords() {
    return (
      <ScrollView>
        <View>
          {clinicalRecordsKeys.length > 0 ? (
            <>
              {clinicalRecordsKeys.map((key) => {
                if (
                  (((clinicalRecordsList[key].es_doctor == true &&
                    isEnabledDoctors == true) ||
                    (clinicalRecordsList[key].es_doctor == false &&
                      isEnabledPatients == true)) &&
                    (!searchFlag ||
                      (searchFlag &&
                        searchText(
                          `${clinicalRecordsList[
                            key
                          ].nombre.toLowerCase()} ${clinicalRecordsList[
                            key
                          ].apellido.toLowerCase()}`
                        )))) ||
                  true
                ) {
                  return (
                    <ClinicalRecordItem
                      key={key}
                      clinicalRecordData={clinicalRecordsList[key]}
                      peopleData={peopleList}
                      categoriesData={categoriesList}
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
      </View>
      <GetAllClinicalRecords />
      <FooterOptions
        navigation={navigation}
        db={dbFirebase}
        screenTypeName={'Agregar Ficha'}
      />
    </SafeAreaView>
  )
}

export default ListClinicalRecords

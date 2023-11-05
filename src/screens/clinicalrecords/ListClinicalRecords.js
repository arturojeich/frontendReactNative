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
  const clinicalRecordsKeys = Object.keys(clinicalRecordsList)
  const peopleKeys = Object.keys(peopleList)
  const categoriesKeys = Object.keys(categoriesList)

  // For the dropdown select options on Create Clinical Record
  const peopleCategoryLists = {
    peopleList: peopleList,
    peopleKeys: peopleKeys,
    categoriesList: categoriesList,
    categoriesKeys: categoriesKeys
  }

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
          {clinicalRecordsKeys.length > 0 &&
          peopleKeys.length > 0 &&
          categoriesKeys.length > 0 ? (
            <>
              {clinicalRecordsKeys.map((key) => {
                if (
                  !searchFlag ||
                  (searchFlag &&
                    searchText(
                      `${peopleList[clinicalRecordsList[key].doctor].nombre} ${
                        peopleList[clinicalRecordsList[key].doctor].apellido
                      }`
                    )) ||
                  searchText(
                    `${peopleList[clinicalRecordsList[key].paciente].nombre} ${
                      peopleList[clinicalRecordsList[key].paciente].apellido
                    }`
                  ) ||
                  searchText(
                    `${
                      categoriesList[clinicalRecordsList[key].categoria]
                        .descripcion
                    }`
                  )
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
          placeholder={'Dr., Paciente o Catg.'}
        />
      </View>
      <GetAllClinicalRecords />
      <FooterOptions
        navigation={navigation}
        db={dbFirebase}
        screenTypeName={'Agregar Ficha'}
        extraData={peopleCategoryLists}
      />
    </SafeAreaView>
  )
}

export default ListClinicalRecords

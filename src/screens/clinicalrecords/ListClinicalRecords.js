import React, { useState, useEffect } from 'react'
import {
  ScrollView,
  View,
  ActivityIndicator,
  SafeAreaView,
  Text,
  Switch
} from 'react-native'
import { app } from '../../../firebaseConfig'
import { getDatabase, ref, onValue } from 'firebase/database'
import ClinicalRecordItem from '../../components/ClinicalRecordItem'
import FooterOptions from '../../components/FooterOptions'
import SearchBar from '../../components/SearchBar'
import DateTimeItem from '../../components/DateTimeItem'

const ListClinicalRecords = ({ navigation }) => {
  const [dbFirebase, setDBFirebase] = useState(getDatabase(app))
  const [searchPhrase, setSearchPhrase] = useState('')
  const [clicked, setClicked] = useState(false)
  const [searchFlag, setSearchFlag] = useState(false)
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [clinicalRecordsList, setClinicalRecordsList] = useState({})
  const [peopleList, setPeopleList] = useState({})
  const [categoriesList, setCategoriesList] = useState({})
  const clinicalRecordsKeys = Object.keys(clinicalRecordsList)
  const peopleKeys = Object.keys(peopleList)
  const categoriesKeys = Object.keys(categoriesList)

  // new Date(100000000)
  // new Date(3155799999999)
  // For the toggle switch
  const [isFilterDate, setIsFilterDate] = useState(false)
  const toggleSwitch = () => {
    setIsFilterDate((previousState) => !previousState)
    if (isFilterDate == true) {
      setStartDate(new Date())
      setEndDate(new Date())
      console.log('Ahora es falso, reset fechas')
    }
  }

  // Verify the date is between the [startDate;endDate]
  // Should be active only when isFilterDate is true
  const checkDates = (date) => {
    let temp = new Date(date.year, date.month, date.day)
    if (
      !isFilterDate ||
      (isFilterDate && temp >= startDate && temp <= endDate)
    ) {
      return true
    } else {
      return false
    }
  }

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
                  checkDates(clinicalRecordsList[key].fecha) &&
                  (!searchFlag ||
                    (searchFlag &&
                      searchText(
                        `${
                          peopleList[clinicalRecordsList[key].doctor].nombre
                        } ${
                          peopleList[clinicalRecordsList[key].doctor].apellido
                        }`
                      )) ||
                    searchText(
                      `${
                        peopleList[clinicalRecordsList[key].paciente].nombre
                      } ${
                        peopleList[clinicalRecordsList[key].paciente].apellido
                      }`
                    ) ||
                    searchText(
                      `${
                        categoriesList[clinicalRecordsList[key].categoria]
                          .descripcion
                      }`
                    ))
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
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start'
          }}
        >
          <Text style={{ fontSize: 16, color: 'grey' }}>
            Filtrar por fecha:{' '}
          </Text>
          <Switch
            trackColor={{ false: '#767577', true: '#767577' }}
            thumbColor={'white'}
            style={{ transform: [{ scaleX: 1.0 }, { scaleY: 1.0 }] }}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isFilterDate}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
            justifyContent: 'space-around'
          }}
        >
          <Text style={{ color: 'grey' }}>Desde: </Text>
          <DateTimeItem
            date={startDate}
            setDate={setStartDate}
            options={{
              width: 110,
              height: 30,
              borderColor: 'grey',
              fontColor: 'grey',
              fontSize: 16,
              backgroundColor: '#f2f2f2'
            }}
          />
          <Text style={{ color: 'grey' }}>Hasta: </Text>
          <DateTimeItem
            date={endDate}
            setDate={setEndDate}
            options={{
              width: 110,
              height: 30,
              borderColor: 'grey',
              fontColor: 'grey',
              fontSize: 16,
              backgroundColor: '#f2f2f2'
            }}
          />
        </View>
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

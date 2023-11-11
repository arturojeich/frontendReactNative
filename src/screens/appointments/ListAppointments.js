import React, { useState, useEffect } from 'react'
import {
  ScrollView,
  View,
  ActivityIndicator,
  SafeAreaView,
  Text,
  Switch,
  TouchableOpacity
} from 'react-native'
import { app } from '../../../firebaseConfig'
import { getDatabase, ref, onValue } from 'firebase/database'
import AppointmentItem from '../../components/AppointmentItem'
import FooterOptions from '../../components/FooterOptions'
import SearchBar from '../../components/SearchBar'
import DateTimeItem from '../../components/DateTimeItem'
import { MaterialIcons } from '@expo/vector-icons'
import { CustomStyles } from '../../customStyles/CustomStyles'

const startOfToday = () => {
  let date = new Date()
  date.setHours(0, 0, 0, 0)
  return date
}

const ListAppointments = ({ navigation }) => {
  const [dbFirebase, setDBFirebase] = useState(getDatabase(app))
  const [searchPhrase, setSearchPhrase] = useState('')
  const [clicked, setClicked] = useState(false)
  const [searchFlag, setSearchFlag] = useState(false)
  const [startDate, setStartDate] = useState(startOfToday())
  const [endDate, setEndDate] = useState(startOfToday())
  const [appointmentsList, setAppointmentsList] = useState({})
  const [peopleList, setPeopleList] = useState({})
  const appointmentRecordsKeys = Object.keys(appointmentsList)
  const peopleKeys = Object.keys(peopleList)

  // new Date(100000000)
  // new Date(3155799999999)
  // For the toggle switch
  const [isFilterDate, setIsFilterDate] = useState(true)
  const toggleSwitch = () => {
    setIsFilterDate((previousState) => !previousState)
    if (isFilterDate == true) {
      setStartDate(startOfToday())
      setEndDate(startOfToday())
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
  const peopleLists = {
    peopleList: peopleList,
    peopleKeys: peopleKeys
  }

  useEffect(() => {
    return onValue(
      ref(dbFirebase, '/administracion/reservas'),
      (querySnapShot) => {
        let data = querySnapShot.val() || {}
        let itemList = { ...data }
        setAppointmentsList(itemList)
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

  function searchText(text) {
    return text.toLowerCase().includes(searchPhrase.toLowerCase())
  }

  function GetAllAppointments() {
    return (
      <ScrollView>
        <View>
          {appointmentRecordsKeys.length > 0 && peopleKeys.length > 0 ? (
            <>
              {appointmentRecordsKeys.map((key) => {
                if (
                  checkDates(appointmentsList[key].fecha) &&
                  (!searchFlag ||
                    (searchFlag &&
                      searchText(
                        `${peopleList[appointmentsList[key].doctor].nombre} ${
                          peopleList[appointmentsList[key].doctor].apellido
                        }`
                      )) ||
                    searchText(
                      `${peopleList[appointmentsList[key].paciente].nombre} ${
                        peopleList[appointmentsList[key].paciente].apellido
                      }`
                    ))
                ) {
                  return (
                    <AppointmentItem
                      key={key}
                      AppointmentData={appointmentsList[key]}
                      peopleData={peopleList}
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
          placeholder={'Dr. o Paciente'}
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
      <GetAllAppointments />
      <FooterOptions
        navigation={navigation}
        db={dbFirebase}
        screenTypeName={'Agregar Reserva'}
        extraData={peopleLists}
      />
    </SafeAreaView>
  )
}

export default ListAppointments

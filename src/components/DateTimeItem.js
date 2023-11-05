import React, { useState } from 'react'
import { SafeAreaView, Button, Text, TouchableOpacity } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { CustomStyles } from '../customStyles/CustomStyles'

const DateTimeItem = ({ date, setDate }) => {
  const [mode, setMode] = useState('date')
  const [show, setShow] = useState(false)

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate
    setShow(false)
    setDate(currentDate)
  }

  const showMode = (currentMode) => {
    setShow(true)
    setMode(currentMode)
  }

  const showDatepicker = () => {
    showMode('date')
  }

  return (
    <SafeAreaView>
      <TouchableOpacity
        style={{
          backgroundColor: 'white',
          fontSize: 26,
          width: 200,
          height: 45,
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: CustomStyles.colors.mainBackground,
          borderWidth: 1,
          borderRadius: 10
        }}
        onPress={showDatepicker}
      >
        <Text style={{ fontSize: 22 }}>{`${date.getDate()}/${
          date.getMonth() + 1
        }/${date.getFullYear()}`}</Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </SafeAreaView>
  )
}

export default DateTimeItem

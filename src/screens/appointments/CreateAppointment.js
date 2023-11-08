import React, { useState } from 'react'
import { View, Text, TextInput, ScrollView, Button, Switch } from 'react-native'
import { ref, push } from 'firebase/database'
import { CustomStyles } from '../../customStyles/CustomStyles'
import { confirm, error } from '../../components/Alerts'
import DropDownList from '../../components/DropDownList'
import DateTimeItem from '../../components/DateTimeItem'

const CreateAppointment = ({ route, navigation }) => {
  let { db, extraData } = route.params
  let { peopleList, peopleKeys } = extraData
  const [patient, setPatient] = useState('')
  const [doctor, setDoctor] = useState('')
  const [horario, setHorario] = useState('')
  const [date, setDate] = useState(new Date())

  let inputText = ''

  handleInputText = (text) => {
    inputText = text
  }

  inputClear = () => {
    //this.textInput1.clear()
    //this.textInput2.clear()
    setPatient('')
    setDoctor('')
    setHorario('')
    setDate(new Date())
  }

  const validateAppointment = (newAppointment) => {
    if (newAppointment !== undefined && newAppointment !== null) {
      if (
        newAppointment.paciente &&
        newAppointment.doctor &&
        newAppointment.fecha &&
        newAppointment.horaInicio &&
        newAppointment.horaFin
      ) {
        return true
      }
    }
    error(
      'No se pudo registrar la reserva',
      'Todos los campos deben completarse!'
    )
    return false
  }

  function postAppointment(newRecord) {
    validateAppointment(newRecord)
      ? push(ref(db, '/administracion/reservas/'), newRecord)
      : console.log('No se pudo agregar una nueva Reserva!')
    console.log('La reserva a guardar es: ' + JSON.stringify(newRecord))
    inputClear()
  }

  // True -> Returns doctors array
  // False -> Returns patiens array
  function filterPeople(flag) {
    let arr = []
    peopleKeys.forEach((key) => {
      if (peopleList[key].es_doctor == flag) {
        arr.push({
          value: key,
          label: `${peopleList[key].nombre} ${peopleList[key].apellido}`
        })
      }
    })
    return arr
  }

  return (
    <ScrollView>
      <View style={CustomStyles.inputContainer}>
        <Text style={[CustomStyles.label, { marginBottom: 10 }]}>Paciente</Text>
        {peopleKeys.length > 0 ? (
          <DropDownList
            style={{ marginBottom: 50 }}
            items={filterPeople(false)}
            value={patient}
            setValue={setPatient}
            zIndex={5000}
            placeholder={'Seleccione un Paciente'}
          />
        ) : null}
      </View>

      <View style={[CustomStyles.inputContainer, { marginTop: 20 }]}>
        <Text style={[CustomStyles.label, { marginBottom: 10 }]}>Doctor</Text>
        {peopleKeys.length > 0 ? (
          <DropDownList
            style={{ marginBottom: 50 }}
            items={filterPeople(true)}
            value={doctor}
            setValue={setDoctor}
            zIndex={4000}
            placeholder={'Seleccione un Doctor'}
          />
        ) : null}
      </View>

      <View style={[CustomStyles.inputContainer, { marginTop: 20 }]}>
        <Text style={[CustomStyles.label, { marginBottom: 10 }]}>
          Hora de Inicio
        </Text>

        <DropDownList
          style={{ marginBottom: 50 }}
          items={[
            { value: '09:00-10:00', label: '09:00 a 10:00' },
            { value: '10:00-11:00', label: '10:00 a 11:00' },
            { value: '11:00-12:00', label: '11:00 a 12:00' },
            { value: '12:00-13:00', label: '12:00 a 13:00' },
            { value: '13:00-14:00', label: '13:00 a 14:00' },
            { value: '14:00-15:00', label: '14:00 a 15:00' },
            { value: '15:00-16:00', label: '15:00 a 16:00' },
            { value: '16:00-17:00', label: '16:00 a 17:00' },
            { value: '17:00-18:00', label: '17:00 a 18:00' },
            { value: '18:00-19:00', label: '18:00 a 19:00' },
            { value: '19:00-20:00', label: '19:00 a 20:00' },
            { value: '20:00-21:00', label: '20:00 a 21:00' }
          ]}
          value={horario}
          setValue={setHorario}
          zIndex={2000}
          placeholder={'Seleccione el Horario'}
        />
      </View>

      <View
        style={[
          CustomStyles.inputContainer,
          {
            marginTop: 40,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center'
          }
        ]}
      >
        <Text style={CustomStyles.label}>Fecha:</Text>
        <DateTimeItem
          date={date}
          setDate={setDate}
          options={{
            width: 200,
            height: 45,
            borderColor: CustomStyles.colors.mainBackground,
            fontColor: 'black',
            fontSize: 22,
            backgroundColor: 'white'
          }}
        />
      </View>

      <View style={[CustomStyles.buttons, { marginTop: 50 }]}>
        <View>
          <Button
            title="Guardar"
            onPress={() => {
              postAppointment({
                paciente: patient,
                doctor: doctor,
                fecha: {
                  day: date.getDate(),
                  month: date.getMonth(),
                  year: date.getFullYear()
                },
                horaInicio: horario.substring(0, 5),
                horaFin: horario.substring(6)
              })
            }}
            color={CustomStyles.colors.mainBackground}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Button
            title="Cancelar"
            onPress={() => {
              inputClear()
            }}
            color="grey"
          />
        </View>
      </View>
    </ScrollView>
  )
}

export default CreateAppointment

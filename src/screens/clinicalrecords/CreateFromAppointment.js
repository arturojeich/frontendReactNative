import React, { useState } from 'react'
import { View, Text, TextInput, ScrollView, Button, Switch } from 'react-native'
import { ref, push } from 'firebase/database'
import { CustomStyles } from '../../customStyles/CustomStyles'
import { confirm, error } from '../../components/Alerts'
import DropDownList from '../../components/DropDownList'

const CreateFromAppointment = ({ route, navigation }) => {
  let { db, extraData } = route.params
  let {
    peopleList,
    categoriesList,
    appointmentList,
    peopleKeys,
    categoriesKeys,
    appointmentKeys
  } = extraData
  const [appointment, setAppointment] = useState('')
  const [category, setCategory] = useState('')
  const [horaInicio, setHoraInicio] = useState('')
  const [horaFin, setHoraFin] = useState('')
  const [motivo, setMotivo] = useState('')
  const [diagnostico, setDiagnostico] = useState('')

  let inputText = ''

  handleInputText = (text) => {
    inputText = text
  }

  inputClear = () => {
    this.textInput1.clear()
    this.textInput2.clear()
    setAppointment('')
    setCategory('')
    setMotivo('')
    setDiagnostico('')
  }

  const validateClinicalRecord = (newRecord) => {
    if (newRecord !== undefined && newRecord !== null) {
      if (
        newRecord.paciente &&
        newRecord.doctor &&
        newRecord.categoria &&
        newRecord.fecha &&
        newRecord.horaInicio &&
        newRecord.horaFin &&
        newRecord.motivo &&
        newRecord.diagnostico
      ) {
        return true
      }
    }
    error(
      'No se pudo registrar la ficha',
      'Todos los campos deben completarse!'
    )
    return false
  }

  function postClinicalRecord(newRecord) {
    validateClinicalRecord(newRecord)
      ? push(ref(db, '/administracion/fichas/'), newRecord)
      : console.log('No se pudo agregar una nueva Ficha!')
    console.log('La ficha a guardar es: ' + JSON.stringify(newRecord))
    inputClear()
  }

  // Returns only the appointment not canceled
  function filterAppointment() {
    let arr = []
    appointmentKeys.forEach((key) => {
      if (appointmentList[key].cancelada == false) {
        arr.push({
          value: key,
          label: `${peopleList[appointmentList[key]?.paciente]?.nombre} ${
            peopleList[appointmentList[key]?.paciente]?.apellido
          }, ${appointmentList[key].fecha.day}/${
            appointmentList[key].fecha.month
          }/${appointmentList[key].fecha.year}`
        })
      }
    })
    return arr
  }

  // Receives the appointment key and set the predefined
  // values for the other fields
  const setFromAppointment = (key) => {
    setPatient(appointmentList[key]?.paciente)
    setDoctor(appointmentList[key]?.doctor)
    setDate(appointmentList[key]?.fecha)
    setHoraInicio(appointmentList[key]?.horaInicio)
    setHoraFin(appointmentList[key]?.horaFin)
    setAppointment(key)
  }

  //   setPatient(appointmentList[key]?.paciente)
  //   setDoctor(appointmentList[key]?.doctor)
  //   setDate(appointmentList[key]?.fecha)
  //   setHoraInicio(appointmentList[key]?.horaInicio)
  //   setHoraFin(appointmentList[key]?.horaFin)
  //   setAppointment(key)
  //   console.log('Fecha: ' + appointmentList[key]?.fecha)
  //   console.log(appointmentList)
  //   console.log(key)

  return (
    <ScrollView>
      <View style={CustomStyles.inputContainer}>
        <Text style={[CustomStyles.label, { marginBottom: 10 }]}>Reserva</Text>
        {appointmentKeys.length > 0 &&
        peopleKeys.length > 0 &&
        categoriesKeys.length ? (
          <DropDownList
            style={{ marginBottom: 50 }}
            items={filterAppointment()}
            value={appointment}
            setValue={setAppointment}
            zIndex={5000}
            placeholder={'Seleccione una reserva'}
          />
        ) : null}
      </View>

      <View style={[CustomStyles.inputContainer, { marginTop: 20 }]}>
        <Text style={[CustomStyles.label, { marginBottom: 10 }]}>
          Categoría
        </Text>
        {categoriesKeys.length > 0 ? (
          <DropDownList
            style={{ marginBottom: 50 }}
            items={categoriesKeys.map((key) => {
              return {
                value: key,
                label: `${categoriesList[key]?.descripcion}`
              }
            })}
            value={category}
            setValue={setCategory}
            zIndex={3000}
            placeholder={'Seleccione una Categoría'}
          />
        ) : null}
      </View>

      <View style={[CustomStyles.inputContainer, { marginTop: 30 }]}>
        <Text style={CustomStyles.label}>Motivo</Text>
        <TextInput
          ref={(input) => {
            this.textInput1 = input
          }}
          style={CustomStyles.textInput}
          placeholder="Motivo de la consulta"
          onChangeText={setMotivo}
          defaultValue={''}
        />
      </View>

      <View style={CustomStyles.inputContainer}>
        <Text style={CustomStyles.label}>Diagnóstico</Text>
        <TextInput
          ref={(input) => {
            this.textInput2 = input
          }}
          style={CustomStyles.textInput}
          placeholder="Diagnóstico a registrar"
          onChangeText={setDiagnostico}
          defaultValue={''}
        />
      </View>

      <View style={[CustomStyles.inputContainer, { marginTop: 20 }]}>
        <Text style={[CustomStyles.label, { marginBottom: 10 }]}>Doctor</Text>
        {appointment !== '' ? (
          <Text style={CustomStyles.textInput}>
            {`${peopleList[appointmentList[appointment].doctor]?.nombre} ${
              peopleList[appointmentList[appointment].doctor]?.apellido
            } `}
          </Text>
        ) : (
          <Text
            style={[
              CustomStyles.textInput,
              { alignItems: 'center', justifyContent: 'center' }
            ]}
          >
            <>{''}</>
          </Text>
        )}
      </View>

      <View style={[CustomStyles.inputContainer, { marginTop: 20 }]}>
        <Text style={[CustomStyles.label, { marginBottom: 10 }]}>Paciente</Text>
        {appointment !== '' ? (
          <Text style={CustomStyles.textInput}>
            {`${peopleList[appointmentList[appointment].paciente]?.nombre} ${
              peopleList[appointmentList[appointment].paciente]?.apellido
            } `}
          </Text>
        ) : (
          <Text style={CustomStyles.textInput}>{''}</Text>
        )}
      </View>

      <View style={[CustomStyles.inputContainer, { marginTop: 20 }]}>
        <Text style={[CustomStyles.label, { marginBottom: 10 }]}>Fecha</Text>

        {appointment !== '' ? (
          <Text style={CustomStyles.textInput}>
            {`${appointmentList[appointment].fecha.day}/${appointmentList[appointment].fecha.month}/${appointmentList[appointment].fecha.year}`}
          </Text>
        ) : (
          <Text style={CustomStyles.textInput}>{''}</Text>
        )}
      </View>

      <View style={[CustomStyles.inputContainer, { marginTop: 20 }]}>
        <Text style={[CustomStyles.label, { marginBottom: 10 }]}>Horario</Text>
        {appointment !== '' ? (
          <Text style={CustomStyles.textInput}>
            {`De ${appointmentList[appointment].horaInicio} a ${appointmentList[appointment].horaFin}`}
          </Text>
        ) : (
          <Text style={CustomStyles.textInput}>{''}</Text>
        )}
      </View>

      <View style={[CustomStyles.buttons, { marginTop: 50 }]}>
        <View>
          <Button
            title="Guardar"
            onPress={() => {
              postClinicalRecord({
                paciente: appointmentList[appointment].paciente,
                doctor: appointmentList[appointment].doctor,
                categoria: category,
                fecha: appointmentList[appointment].fecha,
                horaInicio: appointmentList[appointment].horaInicio,
                horaFin: appointmentList[appointment].horaFin,
                motivo: motivo,
                diagnostico: diagnostico
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

export default CreateFromAppointment

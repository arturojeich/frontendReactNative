import React, { useState } from 'react'
import { View, Text, TextInput, ScrollView, Button, Switch } from 'react-native'
import { ref, push } from 'firebase/database'
import { CustomStyles } from '../../customStyles/CustomStyles'
import { confirm, error } from '../../components/Alerts'
import DropDownList from '../../components/DropDownList'
import DateTimeItem from '../../components/DateTimeItem'

const CreateClinicalRecord = ({ route, navigation }) => {
  let { db, extraData } = route.params
  let { peopleList, categoriesList, peopleKeys, categoriesKeys } = extraData
  const [isEnabled, setIsEnabled] = useState(false)
  const [newRecord, setNewRecord] = useState({})
  const [patient, setPatient] = useState({})
  const [doctor, setDoctor] = useState({})
  const [category, setCategory] = useState({})
  const [horario, setHorario] = useState({})
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState)
  let inputText = ''

  handleInputText = (text) => {
    inputText = text
  }

  inputTextClear = () => {
    this.textInput1.clear()
    this.textInput2.clear()
    this.textInput3.clear()
    this.textInput4.clear()
    this.textInput5.clear()
    setIsEnabled(false)
  }

  validatePerson = (newRecord) => {
    if (newRecord !== undefined && newRecord !== null) {
      if (
        newRecord.nombre &&
        newRecord.apellido &&
        newRecord.cedula &&
        newRecord.telefono &&
        newRecord.email
      ) {
        return true
      }
    }
    error(
      'No se pudo registrar la persona',
      'Todos los campos deben completarse!'
    )
    return false
  }

  function postPeople(newRecord) {
    validatePerson(newRecord)
      ? push(ref(db, '/administracion/fichas/'), newRecord)
      : console.log('No se pudo agregar una nueva Persona!')
    console.log('La persona a guardar es: ' + JSON.stringify(newRecord))
    setNewRecord({ es_doctor: false })
    inputTextClear()
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
          Categoría
        </Text>
        {categoriesKeys.length > 0 ? (
          <DropDownList
            style={{ marginBottom: 50 }}
            items={categoriesKeys.map((key) => {
              return {
                value: key,
                label: `${categoriesList[key].descripcion}`
              }
            })}
            value={category}
            setValue={setCategory}
            zIndex={3000}
            placeholder={'Seleccione una Categoría'}
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

      <View style={[CustomStyles.inputContainer, { marginTop: 20 }]}>
        <Text style={CustomStyles.label}>Fecha</Text>
      </View>

      <View style={CustomStyles.inputContainer}>
        <Text style={CustomStyles.label}>Motivo</Text>
        <TextInput
          ref={(input) => {
            this.textInput5 = input
          }}
          style={CustomStyles.textInput}
          placeholder="motivo"
          onChangeText={(x) => setNewRecord({ ...newRecord, motivo: x })}
          defaultValue={''}
        />
      </View>
      <View style={CustomStyles.inputContainer}>
        <Text style={CustomStyles.label}>Diagnostico</Text>
        <TextInput
          ref={(input) => {
            this.textInput5 = input
          }}
          style={CustomStyles.textInput}
          placeholder="diagnostico"
          onChangeText={(x) => setNewRecord({ ...newRecord, diagnostico: x })}
          defaultValue={''}
        />
      </View>

      <View
        style={[
          CustomStyles.inputContainer,
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly'
          }
        ]}
      >
        <Text style={CustomStyles.label}>Es Doctor?</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={
            isEnabled ? CustomStyles.colors.mainBackground : '#f4f3f4'
          }
          style={{ transform: [{ scaleX: 1.8 }, { scaleY: 1.8 }] }}
          ios_backgroundColor="#3e3e3e"
          onValueChange={(x) => {
            toggleSwitch(),
              console.log('El valor del toggle switch es: ' + x),
              setNewRecord({ ...newRecord, es_doctor: x })
          }}
          value={isEnabled}
        />
      </View>
      <View style={[CustomStyles.buttons, { marginTop: 50 }]}>
        <View>
          <Button
            title="Guardar"
            onPress={() => {
              postPeople(newRecord)
            }}
            color={CustomStyles.colors.mainBackground}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Button
            title="Cancelar"
            onPress={() => {
              setNewRecord({ es_doctor: false })
              inputTextClear()
            }}
            color="grey"
          />
        </View>
      </View>
    </ScrollView>
  )
}

export default CreateClinicalRecord

import React, { useState } from 'react'
import { View, Text, TextInput, ScrollView, Button, Switch } from 'react-native'
import { ref, push } from 'firebase/database'
import { CustomStyles } from '../../customStyles/CustomStyles'
import { confirm, error } from '../../components/Alerts'

const CreatePeople = ({ route, navigation, db }) => {
  const [isEnabled, setIsEnabled] = useState(false)
  const [newPerson, setNewPerson] = useState({ es_doctor: false })
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

  validatePerson = (newPerson) => {
    if (newPerson !== undefined && newPerson !== null) {
      if (
        newPerson.nombre &&
        newPerson.apellido &&
        newPerson.cedula &&
        newPerson.telefono &&
        newPerson.email
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

  function postPeople(newPerson) {
    validatePerson(newPerson)
      ? push(ref(db, '/administracion/personas/'), newPerson)
      : console.log('No se pudo agregar una nueva Persona!')
    console.log('La persona a guardar es: ' + JSON.stringify(newPerson))
    setNewPerson({ es_doctor: false })
    inputTextClear()
  }

  return (
    <ScrollView>
      <View style={CustomStyles.inputContainer}>
        <Text style={CustomStyles.label}>Nombres</Text>
        <TextInput
          ref={(input) => {
            this.textInput1 = input
          }}
          style={CustomStyles.textInput}
          placeholder="Ej. 'Juan Luis'"
          onChangeText={(x) => setNewPerson({ ...newPerson, nombre: x })}
          defaultValue={''}
        />
      </View>
      <View style={CustomStyles.inputContainer}>
        <Text style={CustomStyles.label}>Apellidos</Text>
        <TextInput
          ref={(input) => {
            this.textInput2 = input
          }}
          style={CustomStyles.textInput}
          placeholder="Ej. 'Perez Alves'"
          onChangeText={(x) => setNewPerson({ ...newPerson, apellido: x })}
          defaultValue={''}
        />
      </View>
      <View style={CustomStyles.inputContainer}>
        <Text style={CustomStyles.label}>Teléfono</Text>
        <TextInput
          ref={(input) => {
            this.textInput3 = input
          }}
          style={CustomStyles.textInput}
          placeholder="Ej. '555-555-555'"
          onChangeText={(x) => setNewPerson({ ...newPerson, telefono: x })}
          defaultValue={''}
        />
      </View>
      <View style={CustomStyles.inputContainer}>
        <Text style={CustomStyles.label}>Email</Text>
        <TextInput
          ref={(input) => {
            this.textInput4 = input
          }}
          style={CustomStyles.textInput}
          placeholder="Ej. 'ejemplo@mail.com'"
          onChangeText={(x) => setNewPerson({ ...newPerson, email: x })}
          defaultValue={''}
        />
      </View>
      <View style={CustomStyles.inputContainer}>
        <Text style={CustomStyles.label}>Cédula</Text>
        <TextInput
          ref={(input) => {
            this.textInput5 = input
          }}
          style={CustomStyles.textInput}
          placeholder="Ej. '1234567'"
          onChangeText={(x) => setNewPerson({ ...newPerson, cedula: x })}
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
              setNewPerson({ ...newPerson, es_doctor: x })
          }}
          value={isEnabled}
        />
      </View>
      <View style={[CustomStyles.buttons, { marginTop: 50 }]}>
        <View>
          <Button
            title="Guardar"
            onPress={() => {
              postPeople(newPerson)
            }}
            color={CustomStyles.colors.mainBackground}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Button
            title="Cancelar"
            onPress={() => {
              setNewPerson({ es_doctor: false })
              inputTextClear()
            }}
            color="grey"
          />
        </View>
      </View>
    </ScrollView>
  )
}

export default CreatePeople

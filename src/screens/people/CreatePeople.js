import React, { useState } from 'react'
import { View, Text, TextInput, ScrollView, Button, Switch } from 'react-native'
import { ref, push } from 'firebase/database'
import { CustomStyles } from '../../customStyles/CustomStyles'

const CreatePeople = ({ route, navigation }) => {
  //const { db } = route.params
  const [isEnabled, setIsEnabled] = useState(false)
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState)
  let inputText = ''

  handleInputText = (text) => {
    inputText = text
  }

  validatePerson = (newPerson) => {
    if (newPerson !== undefined && newPerson !== null) {
      if (
        newPerson.nombre &&
        newPerson.apellido &&
        newPerson.cedula &&
        newPerson.telefono &&
        newPerson.email &&
        (newPerson.es_doctor || newPerson.es_doctor)
      ) {
        return true
      }
    }
    return false
  }

  function postPeople(newPerson) {
    validatePerson(newPerson)
      ? push(ref(db, '/administracion/personas/'), newPerson)
      : console.log('No se pudo agregar una nueva Persona!')
  }

  return (
    <ScrollView>
      <View style={CustomStyles.inputContainer}>
        <Text style={CustomStyles.label}>Nombres</Text>
        <TextInput
          ref={(input) => {
            this.textInput = input
          }}
          style={CustomStyles.textInput}
          placeholder="Por ejemplo, 'Juan Luis'"
          onChangeText={(x) => handleInputText(x)}
          defaultValue={inputText}
        />
      </View>
      <View style={CustomStyles.inputContainer}>
        <Text style={CustomStyles.label}>Apellidos</Text>
        <TextInput
          ref={(input) => {
            this.textInput = input
          }}
          style={CustomStyles.textInput}
          placeholder="Por ejemplo, 'Perez Alves'"
          onChangeText={(x) => handleInputText(x)}
          defaultValue={inputText}
        />
      </View>
      <View style={CustomStyles.inputContainer}>
        <Text style={CustomStyles.label}>Teléfono</Text>
        <TextInput
          ref={(input) => {
            this.textInput = input
          }}
          style={CustomStyles.textInput}
          placeholder="Por ejemplo, '555-555-555'"
          onChangeText={(x) => handleInputText(x)}
          defaultValue={inputText}
        />
      </View>
      <View style={CustomStyles.inputContainer}>
        <Text style={CustomStyles.label}>Email</Text>
        <TextInput
          ref={(input) => {
            this.textInput = input
          }}
          style={CustomStyles.textInput}
          placeholder="Por ejemplo, 'ejemplo@mail.com'"
          onChangeText={(x) => handleInputText(x)}
          defaultValue={inputText}
        />
      </View>
      <View style={CustomStyles.inputContainer}>
        <Text style={CustomStyles.label}>Cédula</Text>
        <TextInput
          ref={(input) => {
            this.textInput = input
          }}
          style={CustomStyles.textInput}
          placeholder="Por ejemplo, '1234567'"
          onChangeText={(x) => handleInputText(x)}
          defaultValue={inputText}
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
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <View style={[CustomStyles.buttons, { marginTop: 50 }]}>
        <View>
          <Button
            title="Guardar"
            onPress={() => {
              postPeople({ descripcion: inputText })
            }}
            color={CustomStyles.colors.mainBackground}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Button
            title="Cancelar"
            onPress={() => {
              handleInputText('')
              this.textInput.clear()
            }}
            color="grey"
          />
        </View>
      </View>
    </ScrollView>
  )
}

export default CreatePeople

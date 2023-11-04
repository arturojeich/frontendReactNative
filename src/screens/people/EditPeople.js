import React, { useState } from 'react'
import { View, Text, TextInput, ScrollView, Button, Switch } from 'react-native'
import { ref, push, update } from 'firebase/database'
import { CustomStyles } from '../../customStyles/CustomStyles'
import { confirm, error } from '../../components/Alerts'

const EditPeople = ({ route, navigation }) => {
  const {
    id,
    db,
    peopleData: { nombre, apellido, cedula, telefono, email, es_doctor }
  } = route.params
  const [isEnabled, setIsEnabled] = useState(es_doctor)
  const [nombrePlaceholder, setNombrePlaceholder] = useState(nombre)
  const [apellidoPlaceholder, setApellidoPlaceholder] = useState(apellido)
  const [cedulaPlaceholder, setCedulaPlaceholder] = useState(cedula)
  const [telefonoPlaceholder, setTelefonoPlaceholder] = useState(telefono)
  const [emailPlaceholder, setEmailPlaceholder] = useState(email)

  const [newPerson, setNewPerson] = useState({})
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState)

  handleInputText = (text) => {
    inputText = text
  }

  inputTextClear = () => {
    this.textInput1.clear()
    this.textInput2.clear()
    this.textInput3.clear()
    this.textInput4.clear()
    this.textInput5.clear()
  }

  validatePerson = (newPerson) => {
    if (newPerson !== undefined && newPerson !== null) {
      if (
        newPerson.nombre ||
        newPerson.apellido ||
        newPerson.cedula ||
        newPerson.telefono ||
        newPerson.email ||
        newPerson.es_doctor !== undefined
      ) {
        return true
      }
    }
    return false
  }

  function putPeople(newPerson) {
    if (validatePerson(newPerson)) {
      update(ref(db, `/administracion/personas/${id}`), newPerson)
      newPerson.nombre && setNombrePlaceholder(newPerson.nombre)
      newPerson.apellido && setApellidoPlaceholder(newPerson.apellido)
      newPerson.cedula && setCedulaPlaceholder(newPerson.cedula)
      newPerson.telefono && setTelefonoPlaceholder(newPerson.telefono)
      newPerson.email && setEmailPlaceholder(newPerson.email)
    } else {
      console.log('No se pudo actualizar el registro!')
    }
    console.log(
      'newPerson.es_doctor: ' +
        newPerson.es_doctor +
        ', es_doctor: ' +
        es_doctor
    )
    console.log('La persona a actualizar es: ' + JSON.stringify(newPerson))
    setNewPerson({})
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
          placeholder={`Actual: ${nombrePlaceholder}`}
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
          placeholder={`Actual: ${apellidoPlaceholder}`}
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
          placeholder={`Actual: ${telefonoPlaceholder}`}
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
          placeholder={`Actual: ${emailPlaceholder}`}
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
          placeholder={`Actual: ${cedulaPlaceholder}`}
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
              putPeople(newPerson)
            }}
            color={CustomStyles.colors.mainBackground}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Button
            title="Cancelar"
            onPress={() => {
              setNewPerson({ es_doctor: es_doctor })
              inputTextClear()
              setIsEnabled(es_doctor)
            }}
            color="grey"
          />
        </View>
      </View>
    </ScrollView>
  )
}

export default EditPeople

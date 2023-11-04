import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { CustomStyles } from '../customStyles/CustomStyles'
import { confirm } from './Alerts'

const PeopleItem = ({
  peopleData,
  id,
  db,
  deleteFunction,
  putFunction,
  getFunction,
  navigation
}) => {
  const {
    container,
    titleTheme,
    textTheme,
    doctorIcon,
    buttons,
    shadowProp,
    data,
    elevation
  } = styles
  const { nombre, apellido, telefono, cedula, email, es_doctor } = peopleData
  return (
    <View key={id} style={[container, shadowProp, elevation]}>
      <View style={[data]}>
        <Text
          style={[titleTheme, { alignSelf: 'flex-start' }]}
        >{`${nombre} ${apellido}`}</Text>
        <Text style={[titleTheme]}>CI </Text>
        <Text style={[textTheme]}>{cedula}</Text>
        <Text style={[titleTheme]}>Email</Text>
        <Text style={[textTheme]}>{email}</Text>
        <Text style={[titleTheme]}>Telefono</Text>
        <Text style={[textTheme]}>{telefono}</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[titleTheme]}>Doctor:</Text>
          {es_doctor ? (
            <View style={doctorIcon}>
              <MaterialIcons
                name="check-circle-outline"
                size={30}
                color="green"
              />
            </View>
          ) : (
            <View style={doctorIcon}>
              <MaterialIcons name="close" size={30} color="grey" />
            </View>
          )}
        </View>
      </View>
      <View style={[buttons]}>
        <MaterialIcons.Button
          name="edit"
          size={26}
          color="black"
          style={{ marginRight: 0, marginLeft: 0 }}
          backgroundColor={CustomStyles.colors.mainCard}
          onPress={() => {
            navigation.navigate('Editar Persona', {
              id: id,
              db: db,
              peopleData: peopleData
            })
          }}
        />
        <MaterialIcons.Button
          name="delete"
          size={26}
          color="black"
          backgroundColor={CustomStyles.colors.mainCard}
          onPress={() =>
            confirm(
              'Eliminar',
              `Esta seguro de eliminar el registro de ${nombre} ${apellido}?`,
              deleteFunction,
              id
            )
          }
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 300,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    paddingRight: 10,
    backgroundColor: CustomStyles.colors.mainCard
  },
  titleTheme: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 20
  },
  textTheme: {
    color: 'black',
    fontSize: 16
  },
  doctorIcon: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  data: {
    justifyContent: 'center',
    height: '100%',
    width: '80%',
    paddingLeft: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '20%',
    height: '100%',
    marginRight: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10
  },
  shadowProp: {
    shadowColor: 'black'
  },
  elevation: {
    elevation: 5
  }
})
export default PeopleItem

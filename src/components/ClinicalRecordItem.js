import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { CustomStyles } from '../customStyles/CustomStyles'
import { ref, remove } from 'firebase/database'
import { confirm } from './Alerts'

const ClinicalRecordItem = ({
  clinicalRecordData,
  id,
  db,
  navigation,
  peopleData,
  categoriesData
}) => {
  const {
    container,
    titleTheme,
    textTheme,
    buttons,
    shadowProp,
    data,
    elevation
  } = styles
  const {
    categoria,
    diagnostico,
    doctor,
    fecha,
    horaInicio,
    horaFin,
    motivo,
    paciente
  } = clinicalRecordData

  function deleteClinicalRecord(key) {
    console.log('Delete clinical record, with KEY: ' + key)
    remove(ref(db, `/administracion/fichas/${key}`))
  }

  return (
    <View key={id} style={[container, shadowProp, elevation]}>
      <View style={[data]}>
        <Text style={[titleTheme, { alignSelf: 'flex-start' }]}>
          {`${peopleData[paciente]?.nombre} ${peopleData[paciente]?.apellido}`}
        </Text>
        <Text style={[titleTheme]}>Doctor</Text>
        <Text
          style={[textTheme]}
        >{`${peopleData[doctor]?.nombre} ${peopleData[doctor]?.apellido}`}</Text>
        <Text style={[titleTheme]}>Categoría</Text>
        <Text style={[textTheme]}>
          {categoriesData[categoria]?.descripcion}
        </Text>
        <Text style={[titleTheme]}>Motivo</Text>
        <Text style={[textTheme]}>{motivo}</Text>
        <Text style={[titleTheme]}>Diagnostico</Text>
        <Text style={[textTheme]}>{diagnostico}</Text>
        <Text style={[titleTheme]}>Fecha</Text>
        <Text style={[textTheme]}>{`${fecha.day}/${fecha.month + 1}/${
          fecha.year
        }`}</Text>
        <Text style={[titleTheme]}>Hora</Text>
        <Text style={[textTheme]}>{`${horaInicio}-${horaFin}`}</Text>
      </View>
      <View style={[buttons]}>
        {/*  <MaterialIcons.Button
          name="edit"
          size={26}
          color="black"
          style={{ marginRight: 0, marginLeft: 0 }}
          backgroundColor={CustomStyles.colors.mainCard}
          onPress={() => {
            navigation.navigate('Editar Ficha', {
              id: id,
              db: db,
              clinicalRecordData: clinicalRecordData
            })
          }}
        />*/}
        <MaterialIcons.Button
          name="delete"
          size={26}
          color="black"
          backgroundColor={CustomStyles.colors.mainCard}
          onPress={() =>
            confirm(
              'Eliminar',
              `Esta seguro de eliminar esta ficha del paciente ${peopleData[paciente]?.nombre} ${peopleData[paciente]?.apellido}?`,
              deleteClinicalRecord,
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
    height: 450,
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
export default ClinicalRecordItem

import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

const CategoryItem = ({ data: { descripcion } }) => {
  const { container, textTheme, buttons, shadowProp, data, elevation } = styles
  return (
    <View style={[container, shadowProp, elevation]}>
      <View style={[data]}>
        <Text style={[textTheme]}>{descripcion}</Text>
      </View>
      <View style={[buttons]}>
        <MaterialIcons name="edit" size={26} color="black" />
        <MaterialIcons name="delete" size={26} color="black" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 90,
    width: '95%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 15,
    borderRadius: 10,
    backgroundColor: '#faf2e7'
  },
  textTheme: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 20
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
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '20%',
    height: '100%',
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
export default CategoryItem

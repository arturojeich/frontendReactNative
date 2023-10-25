import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

const ListAppointments = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>List Appointments</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: 'red',
    fontSize: 40
  }
})
export default ListAppointments

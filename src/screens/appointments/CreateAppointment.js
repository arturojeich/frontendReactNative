import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

const CreateAppointment = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create Appointment</Text>
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
export default CreateAppointment

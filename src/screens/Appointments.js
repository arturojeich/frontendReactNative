import React from 'react'
import { SafeAreaView, Text, StyleSheet, View } from 'react-native'

const Appointments = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Appointments</Text>
    </SafeAreaView>
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
export default Appointments

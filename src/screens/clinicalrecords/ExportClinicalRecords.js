import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

const ExportClinicalRecords = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Export Records</Text>
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

export default ExportClinicalRecords

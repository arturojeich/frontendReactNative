import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

const CreateClinicalRecord = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create Record</Text>
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

export default CreateClinicalRecord

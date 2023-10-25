import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

const CreatePeople = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create Person</Text>
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

export default CreatePeople

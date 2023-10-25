import React from 'react'
import { SafeAreaView, Text, StyleSheet } from 'react-native'

const People = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>People</Text>
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
export default People

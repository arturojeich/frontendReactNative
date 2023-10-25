import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

const ListCategories = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>List Categories</Text>
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

export default ListCategories

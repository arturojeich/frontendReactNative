import React from 'react'
import { Text, View, StyleSheet, SafeAreaView } from 'react-native'
import ServiceCategories from '../../services/ServiceCategories'

const ListCategories = () => {
  return (
    <SafeAreaView>
      <ServiceCategories />
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

export default ListCategories

import React, { useState } from 'react'
import { View, Text, TextInput, ScrollView, Button, Switch } from 'react-native'
import { ref, push, update } from 'firebase/database'
import { CustomStyles } from '../../customStyles/CustomStyles'
import { confirm, error } from '../../components/Alerts'

const EditClinicalRecord = ({ route, navigation }) => {
  return (
    <View>
      <Text>Edit Clinical Records</Text>
    </View>
  )
}

export default EditClinicalRecord

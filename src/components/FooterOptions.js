import React from 'react'
import { TouchableOpacity } from 'react-native'
import { CustomStyles } from '../customStyles/CustomStyles'
import { MaterialIcons } from '@expo/vector-icons'

const FooterOptions = ({ navigation, db, screenTypeName }) => {
  return (
    <TouchableOpacity
      style={CustomStyles.createButton}
      onPress={() =>
        navigation.navigate(screenTypeName, {
          db: db
        })
      }
    >
      <MaterialIcons name="add" size={60} color="white" />
    </TouchableOpacity>
  )
}

export default FooterOptions

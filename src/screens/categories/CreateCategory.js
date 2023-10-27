import React, { useState } from 'react'
import { View, Text, TextInput, ScrollView, Button } from 'react-native'
import { ref, push } from 'firebase/database'
import { CustomStyles } from '../../customStyles/CustomStyles'

const CreateCategory = ({ db }) => {
  let inputText = ''

  handleInputText = (text) => {
    inputText = text
  }

  function postCategory(newCategory) {
    newCategory.descripcion !== ''
      ? push(ref(db, '/administracion/categorias'), newCategory)
      : console.log('No se pudo crear nueva categoria!')
  }

  return (
    <ScrollView contentContainerStyle={CustomStyles.contentContainer}>
      <View style={CustomStyles.inputContainer}>
        <Text style={CustomStyles.label}>Descripción de Categoría</Text>
        <TextInput
          ref={(input) => {
            this.textInput = input
          }}
          style={CustomStyles.textInput}
          placeholder="Por ejemplo, 'Oftalmología'"
          onChangeText={(x) => handleInputText(x)}
          defaultValue={inputText}
        />
      </View>
      <View style={CustomStyles.buttons}>
        <View>
          <Button
            title="Guardar"
            onPress={() => {
              postCategory({ descripcion: inputText })
            }}
            color={CustomStyles.colors.mainBackground}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Button
            title="Cancelar"
            onPress={() => {
              handleInputText('')
              this.textInput.clear()
            }}
            color="grey"
          />
        </View>
      </View>
    </ScrollView>
  )
}

export default CreateCategory

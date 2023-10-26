import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  Button
} from 'react-native'
import {
  getDatabase,
  ref,
  onValue,
  push,
  update,
  remove
} from 'firebase/database'
import { CustomStyles } from '../../customStyles/CustomStyles'

const CreateCategory = () => {
  //const [inputText, setInputText] = useState('')
  let inputText = ''

  handleInputText = (text) => {
    inputText = text
  }
  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Descripción de Categoría</Text>
        <TextInput
          ref={(input) => {
            this.textInput = input
          }}
          style={styles.textInput}
          placeholder="Por ejemplo, 'Oftalmología'"
          onChangeText={(x) => handleInputText(x)}
          defaultValue={inputText}
        />
      </View>
      <View style={styles.buttons}>
        <View>
          <Button
            title="Guardar"
            onPress={() => console.log('Guardando: ' + inputText)}
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

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: '100%'
  },
  container: {
    flex: 1
  },
  inputContainer: {
    width: '100%'
  },
  label: {
    alignSelf: 'center',
    borderStyle: 'solid',
    fontSize: 24
  },
  textInput: {
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 2,
    borderColor: CustomStyles.colors.mainBackground,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 20,
    fontSize: 24,
    width: '100%'
  },
  buttons: {
    marginTop: 40,
    width: '100%'
  }
})

export default CreateCategory

import React from 'react'
import { StyleSheet, TextInput, View, Keyboard, Button } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

const SearchBar = ({
  clicked,
  searchPhrase,
  setSearchPhrase,
  setClicked,
  submitingText
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <MaterialIcons
          name="search"
          size={26}
          color="black"
          style={{ marginLeft: 1 }}
        />

        <TextInput
          style={styles.input}
          placeholder="Search"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onSubmitEditing={() => {
            setSearchPhrase(searchPhrase), () => submitingText()
          }}
          onFocus={() => {
            setClicked(true)
          }}
        />

        {clicked && (
          <MaterialIcons
            name="close"
            size={26}
            color="black"
            style={{ marginLeft: -25 }}
            onPress={() => {
              setSearchPhrase('')
              setClicked(false)
            }}
          />
        )}
      </View>
      {clicked && (
        <MaterialIcons
          name="check"
          size={26}
          color="green"
          style={{ marginLeft: 10 }}
          onPress={() => {
            setSearchPhrase(''), setClicked(false), () => submitingText()
          }}
        />
      )}
    </View>
  )
}
export default SearchBar

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    marginTop: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%'
  },
  searchBar: {
    padding: 10,
    marginLeft: 30,
    flexDirection: 'row',
    width: '80%',
    backgroundColor: '#d9dbda',
    borderRadius: 15,
    alignItems: 'center'
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: '90%'
  }
})

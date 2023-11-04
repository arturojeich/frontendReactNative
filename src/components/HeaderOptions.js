import React from 'react'
import { View, Text, Switch } from 'react-native'
import { CustomStyles } from '../customStyles/CustomStyles'
import SearchBar from './SearchBar'

const HeaderOptions = ({
  searchFlag,
  searchPhrase,
  clicked,
  isEnabledDoctors,
  isEnabledPatients,
  setSearchFlag,
  setSearchPhrase,
  setClicked,
  toggleSwitchDoctors,
  toggleSwitchPatients
}) => {
  return (
    <View>
      <View>
        <SearchBar
          searchFlag={searchFlag}
          searchPhrase={searchPhrase}
          clicked={clicked}
          setSearchFlag={setSearchFlag}
          setSearchPhrase={setSearchPhrase}
          setClicked={setClicked}
        />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <View
          style={[
            CustomStyles.inputContainer,
            {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              width: '50%'
            }
          ]}
        >
          <Text style={[CustomStyles.label, { fontSize: 20, color: 'grey' }]}>
            Doctores
          </Text>
          <Switch
            trackColor={{ false: '#767577', true: '#767577' }}
            thumbColor={'white'}
            style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitchDoctors}
            value={isEnabledDoctors}
          />
        </View>
        <View
          style={[
            CustomStyles.inputContainer,
            {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              width: '50%'
            }
          ]}
        >
          <Text style={[CustomStyles.label, { fontSize: 20, color: 'grey' }]}>
            Pacientes
          </Text>
          <Switch
            trackColor={{ false: '#767577', true: '#767577' }}
            thumbColor={'white'}
            style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitchPatients}
            value={isEnabledPatients}
          />
        </View>
      </View>
    </View>
  )
}

export default HeaderOptions

import React, { useState, useEffect } from 'react'
import {
  ScrollView,
  View,
  ActivityIndicator,
  SafeAreaView,
  Text,
  Switch,
  TouchableOpacity
} from 'react-native'
import { app } from '../../../firebaseConfig'
import { getDatabase, ref, onValue } from 'firebase/database'
import ClinicalRecordItem from '../../components/ClinicalRecordItem'
import FooterOptions from '../../components/FooterOptions'
import SearchBar from '../../components/SearchBar'
import DateTimeItem from '../../components/DateTimeItem'
import { MaterialIcons } from '@expo/vector-icons'
import { CustomStyles } from '../../customStyles/CustomStyles'
import * as XLSX from 'xlsx'
import * as FileSystem from 'expo-file-system'
import { printToFileAsync } from 'expo-print'
import { shareAsync } from 'expo-sharing'
import * as Sharing from 'expo-sharing';


const ListClinicalRecords = ({ navigation }) => {
  const [dbFirebase, setDBFirebase] = useState(getDatabase(app))
  const [searchPhrase, setSearchPhrase] = useState('')
  const [clicked, setClicked] = useState(false)
  const [searchFlag, setSearchFlag] = useState(false)
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [clinicalRecordsList, setClinicalRecordsList] = useState({})
  const [peopleList, setPeopleList] = useState({})
  const [categoriesList, setCategoriesList] = useState({})
  const [appointmentList, setAppointmentList] = useState({})
  const clinicalRecordsKeys = Object.keys(clinicalRecordsList)
  const peopleKeys = Object.keys(peopleList)
  const categoriesKeys = Object.keys(categoriesList)
  const appointmentKeys = Object.keys(appointmentList)

  // new Date(100000000)
  // new Date(3155799999999)
  // For the toggle switch
  const [isFilterDate, setIsFilterDate] = useState(false)
  const toggleSwitch = () => {
    setIsFilterDate((previousState) => !previousState)
    if (isFilterDate == true) {
      setStartDate(new Date())
      setEndDate(new Date())
      console.log('Ahora es falso, reset fechas')
    }
  }

  // Verify the date is between the [startDate;endDate]
  // Should be active only when isFilterDate is true
  const checkDates = (date) => {
    let temp = new Date(date.year, date.month, date.day)
    if (
      !isFilterDate ||
      (isFilterDate && temp >= startDate && temp <= endDate)
    ) {
      return true
    } else {
      return false
    }
  }

  // For the dropdown select options on Create Clinical Record
  const peopleCategoryLists = {
    peopleList: peopleList,
    peopleKeys: peopleKeys,
    categoriesList: categoriesList,
    categoriesKeys: categoriesKeys
  }

  useEffect(() => {
    return onValue(
      ref(dbFirebase, '/administracion/fichas'),
      (querySnapShot) => {
        let data = querySnapShot.val() || {}
        let itemList = { ...data }
        setClinicalRecordsList(itemList)
      }
    )
  }, [])

  useEffect(() => {
    return onValue(
      ref(dbFirebase, '/administracion/personas'),
      (querySnapShot) => {
        let data = querySnapShot.val() || {}
        let itemList = { ...data }
        setPeopleList(itemList)
      }
    )
  }, [])

  useEffect(() => {
    return onValue(
      ref(dbFirebase, '/administracion/categorias'),
      (querySnapShot) => {
        let data = querySnapShot.val() || {}
        let itemList = { ...data }
        setCategoriesList(itemList)
      }
    )
  }, [])

  useEffect(() => {
    return onValue(
      ref(dbFirebase, '/administracion/reservas'),
      (querySnapShot) => {
        let data = querySnapShot.val() || {}
        let itemList = { ...data }
        setAppointmentList(itemList)
      }
    )
  }, [])

  function searchText(text) {
    return text.toLowerCase().includes(searchPhrase.toLowerCase())
  }

  function GetAllClinicalRecords() {
    return (
      <ScrollView>
        <View>
          {clinicalRecordsKeys.length > 0 &&
          peopleKeys.length > 0 &&
          categoriesKeys.length > 0 ? (
            <>
              {clinicalRecordsKeys.map((key) => {
                if (
                  checkDates(clinicalRecordsList[key].fecha) &&
                  (!searchFlag ||
                    (searchFlag &&
                      searchText(
                        `${
                          peopleList[clinicalRecordsList[key].doctor].nombre
                        } ${
                          peopleList[clinicalRecordsList[key].doctor].apellido
                        }`
                      )) ||
                    searchText(
                      `${
                        peopleList[clinicalRecordsList[key].paciente].nombre
                      } ${
                        peopleList[clinicalRecordsList[key].paciente].apellido
                      }`
                    ) ||
                    searchText(
                      `${
                        categoriesList[clinicalRecordsList[key].categoria]
                          .descripcion
                      }`
                    ))
                ) {
                  return (
                    <ClinicalRecordItem
                      key={key}
                      clinicalRecordData={clinicalRecordsList[key]}
                      peopleData={peopleList}
                      categoriesData={categoriesList}
                      id={key}
                      navigation={navigation}
                      db={dbFirebase}
                    />
                  )
                } else {
                  return null
                }
              })}
            </>
          ) : (
            <ActivityIndicator size={'large'} color={`black`} />
          )}
        </View>
      </ScrollView>
    )
  }

function GetAllClinicalRecordsExport() {
    let recordsArray = [];

    if (clinicalRecordsKeys.length > 0 && peopleKeys.length > 0 && categoriesKeys.length > 0) {
        clinicalRecordsKeys.forEach((key) => {
            if (
                checkDates(clinicalRecordsList[key].fecha) &&
                (!searchFlag ||
                    (searchFlag &&
                        searchText(
                            `${
                                peopleList[clinicalRecordsList[key].doctor].nombre
                            } ${
                                peopleList[clinicalRecordsList[key].doctor].apellido
                            }`
                        )) ||
                    searchText(
                        `${
                            peopleList[clinicalRecordsList[key].paciente].nombre
                        } ${
                            peopleList[clinicalRecordsList[key].paciente].apellido
                        }`
                    ) ||
                    searchText(
                        `${
                            categoriesList[clinicalRecordsList[key].categoria]
                                .descripcion
                        }`
                    ))
            ) {
                recordsArray.push({
                    categoria: categoriesList[clinicalRecordsList[key].categoria].descripcion,
                    diagnostico: clinicalRecordsList[key].diagnostico,
                    doctor: peopleList[clinicalRecordsList[key].doctor].nombre + ' ' + peopleList[clinicalRecordsList[key].doctor].apellido,
                    fecha: clinicalRecordsList[key].fecha.day + '-' + clinicalRecordsList[key].fecha.month + '-' + clinicalRecordsList[key].fecha.year,
                    horaFin: clinicalRecordsList[key].horaFin,
                    horaInicio: clinicalRecordsList[key].horaInicio,
                    motivo: clinicalRecordsList[key].motivo,
                    paciente: peopleList[clinicalRecordsList[key].paciente].nombre + ' ' + peopleList[clinicalRecordsList[key].paciente].apellido,
                });
            }
        });
    }

    return recordsArray;
}

    const generateExcel = () => {
        let recordsArray = GetAllClinicalRecordsExport();
        //console.log(recordsArray);

        let wb = XLSX.utils.book_new();

        // Create an array for the headers
        let ws_data = [["Categoría", "Diagnóstico", "Doctor", "Fecha", "horaFin", "horaInicio", "Motivo", "Paciente"]];

        // Convert each record to an array and add it to ws_data
        for(let record of recordsArray) {
            ws_data.push([record.categoria, record.diagnostico, record.doctor, record.fecha, record.horaFin, record.horaInicio, record.motivo, record.paciente]);
        }

        console.log(ws_data)

        let ws = XLSX.utils.aoa_to_sheet(ws_data);
        XLSX.utils.book_append_sheet(wb, ws, "MyFirstSheet", true);

        const base64 = XLSX.write(wb, { type: "base64" });
        const filename = FileSystem.documentDirectory + "MyExcel2.xlsx";
        FileSystem.writeAsStringAsync(filename, base64, {
            encoding: FileSystem.EncodingType.Base64
        }).then(() => {
            Sharing.shareAsync(filename);
        });
    };


function generateHTML(recordsArray) {
    let html = '<html><body>';
    recordsArray.forEach((record) => {
        html += `<h1>Paciente: ${record.paciente}</h1>`;
        html += `<p>Categoria: ${record.categoria}</p>`;
        html += `<p>Diagnostico: ${record.diagnostico}</p>`;
        html += `<p>Doctor: ${record.doctor}</p>`;
        html += `<p>Fecha: ${record.fecha}</p>`;
        html += `<p>Hora Inicio: ${record.horaInicio}</p>`;
        html += `<p>Hora Fin: ${record.horaFin}</p>`;
        html += `<p>Motivo: ${record.motivo}</p>`;
    });
    html += '</body></html>';
    return html;
}


    let createPDF = async () => {
      /*let options = {
        html: '<h1>PDF TEST</h1><p>This is an example PDF.</p>', // replace with your HTML
        fileName: 'test',
        directory: 'Documents',
      };

      let file = await RNHTMLtoPDF.convert(options);
      // console.log(file.filePath);
      alert(file.filePath);*/
      const html = generateHTML(GetAllClinicalRecordsExport())
      //console.log(GetAllClinicalRecordsExport())
      const file = await printToFileAsync({
            html: html,
            base64: false
          });

          await shareAsync(file.uri);
    };


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <SearchBar
          searchFlag={searchFlag}
          searchPhrase={searchPhrase}
          clicked={clicked}
          setSearchFlag={setSearchFlag}
          setSearchPhrase={setSearchPhrase}
          setClicked={setClicked}
          placeholder={'Dr., Paciente o Catg.'}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start'
          }}
        >
          <Text style={{ fontSize: 16, color: 'grey' }}>
            Filtrar por fecha:{' '}
          </Text>
          <Switch
            trackColor={{ false: '#767577', true: '#767577' }}
            thumbColor={'white'}
            style={{ transform: [{ scaleX: 1.0 }, { scaleY: 1.0 }] }}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isFilterDate}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
            justifyContent: 'space-around'
          }}
        >
          <Text style={{ color: 'grey' }}>Desde: </Text>
          <DateTimeItem
            date={startDate}
            setDate={setStartDate}
            options={{
              width: 110,
              height: 30,
              borderColor: 'grey',
              fontColor: 'grey',
              fontSize: 16,
              backgroundColor: '#f2f2f2'
            }}
          />
          <Text style={{ color: 'grey' }}>Hasta: </Text>
          <DateTimeItem
            date={endDate}
            setDate={setEndDate}
            options={{
              width: 110,
              height: 30,
              borderColor: 'grey',
              fontColor: 'grey',
              fontSize: 16,
              backgroundColor: '#f2f2f2'
            }}
          />
        </View>
      </View>
      <GetAllClinicalRecords />
      <FooterOptions
        navigation={navigation}
        db={dbFirebase}
        screenTypeName={'Agregar Ficha'}
        extraData={peopleCategoryLists}
      />
      <TouchableOpacity
        style={[
          CustomStyles.createButton,
          { right: 30, bottom: 100, backgroundColor: 'green' }
        ]}
        onPress={() =>
          navigation.navigate('Agregar Ficha (con reserva)', {
            db: dbFirebase,
            extraData: {
              peopleList: peopleCategoryLists.peopleList,
              peopleKeys: peopleCategoryLists.peopleKeys,
              categoriesList: peopleCategoryLists.categoriesList,
              categoriesKeys: peopleCategoryLists.categoriesKeys,
              appointmentList: appointmentList,
              appointmentKeys: appointmentKeys
            }
          })
        }
      >
        <MaterialIcons name="post-add" size={50} color="white" />
      </TouchableOpacity>
    <TouchableOpacity
          style={[
            CustomStyles.createButton,
            { right: 30, bottom: 170, backgroundColor: 'blue' } // adjust the position and color as needed
          ]}
          onPress={createPDF}
        >
          <MaterialIcons name="picture-as-pdf" size={50} color="white" />
        </TouchableOpacity>
    <TouchableOpacity
        style={[
            CustomStyles.createButton,
            { right: 30, bottom: 240, backgroundColor: 'orange' } // adjust the position and color as needed
        ]}
        onPress={generateExcel}
        >
        <MaterialIcons name="table-rows" size={50} color="white" />
        </TouchableOpacity>
    </SafeAreaView>
  )
}

export default ListClinicalRecords

import React, { useState, useEffect } from 'react'
import { app } from '../../firebaseConfig'
import {
  getDatabase,
  ref,
  onValue,
  push,
  update,
  remove
} from 'firebase/database'
import { ScrollView, View, Text, FlatList } from 'react-native'
import CategoryItem from '../components/CategoryItem'

const ServiceCategories = () => {
  const [doneState, setDone] = useState(false)
  const [categoriesList, setCategories] = useState({})
  const categoriesKeys = Object.keys(categoriesList)

  const db = getDatabase(app)
  useEffect(() => {
    return onValue(ref(db, '/administracion/categorias'), (querySnapShot) => {
      let data = querySnapShot.val() || {}
      let itemList = { ...data }
      setCategories(itemList)
    })
  }, [])
  console.log('Categories: ' + JSON.stringify(categoriesList))
  //console.log('Categories Descriptions: ' + categoriesList['abcde'])
  function getAllCategories() {
    //console.log('Get All Categories')
    return (
      <ScrollView>
        <View>
          {categoriesKeys.length > 0 ? (
            categoriesKeys.map((key) => (
              <CategoryItem key={key} data={categoriesList[key]} id={key} />
            ))
          ) : (
            //
            //<Text key={key}>{key}</Text>
            <Text>Nothing yet</Text>
          )}
        </View>
      </ScrollView>
    )
  }

  function getCategory() {
    console.log('Get Category')
  }

  function postCategory() {
    console.log('Create Category')
  }

  function deleteCategory() {
    console.log('Delete Category')
  }

  function putCategory() {
    console.log('Update Category')
  }

  return getAllCategories()
}

export default ServiceCategories

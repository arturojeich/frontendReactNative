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
import {
  ScrollView,
  View,
  ActivityIndicator,
  Text,
  FlatList
} from 'react-native'
import CategoryItem from '../components/CategoryItem'

var db = null

const ServiceCategories = () => {
  const [doneState, setDone] = useState(false)
  const [categoriesList, setCategories] = useState({})
  const categoriesKeys = Object.keys(categoriesList)

  db = getDatabase(app)
  useEffect(() => {
    return onValue(ref(db, '/administracion/categorias'), (querySnapShot) => {
      let data = querySnapShot.val() || {}
      let itemList = { ...data }
      setCategories(itemList)
    })
  }, [])

  function getAllCategories() {
    return (
      <ScrollView>
        <View>
          {categoriesKeys.length > 0 ? (
            categoriesKeys.map((key) => (
              <CategoryItem
                key={key}
                data={categoriesList[key]}
                id={key}
                deleteFunction={deleteCategory}
                putFunction={putCategory}
                getFunction={getCategory}
              />
            ))
          ) : (
            <ActivityIndicator size={'large'} color={`black`} />
          )}
        </View>
      </ScrollView>
    )
  }

  function getCategory() {
    console.log('Get Category')
  }

  function postCategory(newCategory) {
    console.log('Create Category, with descripcion: ' + newCategory.descripcion)
    push(ref(db, '/administracion/categorias'), newCategory)
  }

  function deleteCategory(key) {
    console.log('Delete Category, with KEY: ' + key)
    console.log(categoriesList[key])
    remove(ref(db, `/administracion/categorias/${key}`))
  }

  function putCategory({ id, descripcion }) {
    console.log('Update Category, with description: ' + descripcion)
    console.log('Update Category, with id: ' + id)
  }

  return getAllCategories()
}

export default ServiceCategories

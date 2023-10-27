import React, { useState, useEffect } from 'react'
import { app } from '../../../firebaseConfig'
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
  SafeAreaView,
  TouchableOpacity
} from 'react-native'
import CategoryItem from '../../components/CategoryItem'
import { NavigationContainer } from '@react-navigation/native'
import { CustomStyles } from '../../customStyles/CustomStyles'
import CreateCategory from './CreateCategory'
import { createStackNavigator } from '@react-navigation/stack'

var db = null

const ListCategories = ({ navigation }) => {
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

  function GetAllCategories() {
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

  function FooterButtons() {
    return (
      <TouchableOpacity
        style={CustomStyles.createButton}
        onPress={() => navigation.navigate('Agregar Categoría')}
      >
        <Text style={CustomStyles.createButtonText}>Nueva Categoría</Text>
      </TouchableOpacity>
    )
  }

  function getCategory() {
    console.log('Get Category')
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GetAllCategories />
      <FooterButtons />
    </SafeAreaView>
  )
}

const forFade = ({ current, next }) => {
  const opacity = Animated.add(
    current.progress,
    next ? next.progress : 0
  ).interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 0]
  })

  return {
    leftButtonStyle: { opacity },
    rightButtonStyle: { opacity },
    titleStyle: { opacity },
    backgroundStyle: { opacity }
  }
}
const Stack = createStackNavigator()

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Lista de Categorías"
        component={ListCategories}
        options={{
          headerTintColor: CustomStyles.colors.mainText,
          headerStyle: { backgroundColor: 'white' },
          headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen
        name="Agregar Categoría"
        options={{
          headerStyleInterpolator: forFade,
          headerTitleAlign: 'center'
        }}
      >
        {(props) => <CreateCategory {...props} db={db} />}
      </Stack.Screen>
    </Stack.Navigator>
  )
}

const Categories = () => {
  return (
    <NavigationContainer independent={true}>
      <MyStack />
    </NavigationContainer>
  )
}

export default Categories

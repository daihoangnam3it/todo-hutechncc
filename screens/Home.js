import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View,RefreshControl } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import MainStack from './MainStackNavigator'
import AuthStack from './AuthStackNavigator'

const Home = ({navigation}) => {
  const [login,setLogin]=useState(AsyncStorage.getItem('@Login'))
  useEffect(()=>{
    const getLogin = async ()=>{
      await AsyncStorage.getItem('@Login',(err,res)=>{
        setLogin(res)
      })
      
    }
    getLogin();
  },[navigation])
  const HomeStack = createStackNavigator();
  
  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('@Login')
      navigation.navigation('register');
    } catch(e) {
      // remove error
    }
  }
  getAllKeys = async () => {
    let keys = []
    try {
      keys = await AsyncStorage.getAllKeys()
    } catch(e) {
      // read key error
    }
  
    console.log(keys)
    // example console.log result:
    // ['@MyApp_user', '@MyApp_key']
  }

  return (
    // <HomeStack.Navigator
    //   mode={'model'}
    //   screenOptions={{
    //     headerShown: false,
    //   }}
    // >
    // {login==='ok'? <HomeStack.Screen name={'MainStack'} component={MainStack} />: <HomeStack.Screen name={'AuthStack'} component={AuthStack} />}
     
     
    // </HomeStack.Navigator>
    <View>
      <Text>ABC</Text>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})

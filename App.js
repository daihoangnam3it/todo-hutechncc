import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeLogin from './screens/Login';
import HomeRegister from './screens/Register';
import Home from './screens/Home';
import AuthNavigator from './screens/AuthStackNavigator';
import MainNavigator from './screens/MainStackNavigator';
import axios from 'axios'
export const AuthContext = React.createContext();
const Root = createStackNavigator();
export default function App() {
  const [mess,setMess]=useState('');
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );
  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log('App',e);
      }
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);
  const authContext = React.useMemo(
    () => ({
      signIn: async (name, password) => {
        try{
          const res = await axios.post(
            'https://caso-full-test.herokuapp.com/mobile/login',
            {
              name: name,
              password: password,
            },
          );
          setMess('')
          AsyncStorage.setItem('userToken',res.data);
          dispatch({ type: 'SIGN_IN', token: res.data });

        }catch(err){
          err.response.data.msg && setMess(err.response.data.msg)
        }
      },
      signOut: () =>{
        AsyncStorage.removeItem('userToken');
        dispatch({ type: 'SIGN_OUT' });
      },
      signUp: async (data) => {
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    [],
  );
  console.log(state.userToken);
  return (
    <AuthContext.Provider value={{authContext,user:state.userToken,mess:mess}}>
      <NavigationContainer>
        <Root.Navigator screenOptions={{ headerShown: false }}>
          {state.userToken == null ? (
            <Root.Screen name={'AuthStack'} component={AuthNavigator} />
          ) : (
            <Root.Screen name={'MainStack'} component={MainNavigator} />
          )}
        </Root.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

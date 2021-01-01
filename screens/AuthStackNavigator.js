import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { createStackNavigator } from '@react-navigation/stack';
import HomeLogin from './Login';
import HomeRegister from './Register';
export default function AuthNavigator() {
  const AuthStack = createStackNavigator();
  const LoginStack = createStackNavigator();
  return (
    <AuthStack.Navigator
      mode={'model'}
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name={'LoginStack'}>
        {() => (
          <LoginStack.Navigator
            mode={'card'}
            screenOptions={{
              headerShown: false,
            }}
          >
            <LoginStack.Screen name={'Login'} component={HomeLogin} />
          </LoginStack.Navigator>
        )}
      </AuthStack.Screen>
      <AuthStack.Screen name={'Register'} component={HomeRegister} />
    </AuthStack.Navigator>
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

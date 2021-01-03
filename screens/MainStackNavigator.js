import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Todo from './todoMain'
import { createStackNavigator } from '@react-navigation/stack';
export default function AuthNavigator() {
  const MainStack = createStackNavigator();
  return (
    <MainStack.Navigator
      mode={'model'}
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen name={'Main'} component={Todo} />
    </MainStack.Navigator>
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

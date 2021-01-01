import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Button
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AuthContext } from '../..//App';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';

const Category = ({navigation}) => {
  return (
    <View>
    <TouchableOpacity style={{alignItems:"flex-end",margin:16}} onPress={() => navigation.openDrawer()}>
          <FontAwesome name='bars' size={32} color='black' />
        </TouchableOpacity>

      <Text>Status</Text>
    </View>
  )
}

export default Category

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text: {
    color: '#000',
    fontSize: 20,
    fontWeight: '500',
  },
})

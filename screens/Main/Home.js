import React, { Component } from 'react'
import { Text, View,Dimensions,TouchableOpacity} from 'react-native'

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph
} from 'expo-chart-kit'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AuthContext } from '../..//App';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
const Home = ({navigation}) => {
  const screenWidth = Dimensions.get('window').width
  const data = [
    { name: 'Seoul', population: 50, color: 'rgba(131, 167, 234, 1)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Toronto', population: 50, color: '#F00', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Toronto', population: 20, color: '#F1f024', legendFontColor: '#7F7F7F', legendFontSize: 15 },
   
  ]
  return (
    <View>

    {/* <TouchableOpacity style={{alignItems:"flex-end",margin:16}} onPress={() => navigation.openDrawer()}>
    <FontAwesome name='bars' size={32} color='black' />
  </TouchableOpacity> */}

    <PieChart
  data={data}
  width={screenWidth}
  height={220}
  chartConfig={{
      backgroundColor: '#e26a00',
      backgroundGradientFrom: '#fb8c00',
      backgroundGradientTo: '#ffa726',
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      }
    }}
  accessor="population"
  backgroundColor="transparent"
  paddingLeft="15"
/>
    </View>
  )
}

export default Home


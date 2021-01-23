import React, { Component } from 'react'
import { Text, View,Dimensions,TouchableOpacity} from 'react-native'
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph
} from 'expo-chart-kit'
import { AuthContext } from '../..//App';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import URL from '../../index'

const Home = ({navigation}) => {
  const { authContext, user } = React.useContext(AuthContext);
  const [notes, setNotes] =React.useState([]);
  const [done,setDone]=React.useState([]);
  const [processing,setProcessing]=React.useState([]);
  const [pending,setPending]=React.useState([]);
  const getData = async () => {
    const res = await axios.get(`${URL}/mobile-note/get/${user}`);
    setNotes(res.data)
    console.log(res.data);
    let newDone=res.data.filter(el=>el.status==="Đang làm");
    console.log(newDone.length);
    let newProcessing=res.data.filter(el=>el.status==="Xong rồi");
    console.log(newProcessing.length);
    let newPending=res.data.filter(el=>el.status=="Chưa làm");
   
    setDone(newDone);
    setProcessing(newProcessing);
    setPending(newPending)

  }
  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, []));

  const screenWidth = Dimensions.get('window').width
  const data = [
    { name: done.length?'Xong rồi':'Chưa có', population: done.length, color: 'rgba(131, 167, 234, 1)', legendFontColor: '#7F7F7F', legendFontSize: 10 },
    { name: processing.length?'Đang làm':'Chưa có', population: processing.length, color: '#F00', legendFontColor: '#7F7F7F', legendFontSize: 10},
    { name: pending.length?'Khi khác làm':'Chưa có', population: pending.length, color: '#F1f024', legendFontColor: '#7F7F7F', legendFontSize: 10 },
   
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


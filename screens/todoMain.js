import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer,useFocusEffect  } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AuthContext } from '../App';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import TodoMain from './main';
import Category from './Main/Category'
import Status from './Main/Status'
import Priority from './Main/Priority'
import Home from './Main/Home'
import List from '../components/Slibar'
import ChangeInfo from './Main/ChangeInfo'
import ChangePass from './Main/ChangePass'
import URL from '../index'
import { createContext } from 'react';
const todoMain = ({ navigation,name }) => {
  const { authContext, user } = React.useContext(AuthContext);
  const [info, setInfo] = React.useState('');
  // Lấy thông tin cá nhân
  const getInfo = async () => {
    const res = await axios.get(
      `${URL}/mobile/get/${user}`,
    );
    setInfo(res.data.name);
  };
  // Chạy khi mới vào
  useFocusEffect(() => {
    if (user) {
      getInfo();
    }
  }, [user]);
  // Tạo chức năng hiển thị thanh menu
  const Drawer = createDrawerNavigator();
  //Khai báo các màn hình - tổng hợp các chức năng
  return (
    //headerShown:true -- Hiển thị thanh tiêu đề
    //drawerContent={props=><List {...props} ghi vào danh sách menu ở file components/slibar.js
    <Drawer.Navigator screenOptions={{ headerShown: true }} drawerContent={props=><List {...props}/>}  >
        <Drawer.Screen name="Home" component={Home}/>
        <Drawer.Screen name="Note" component={TodoMain}/>
        <Drawer.Screen name="Category" component={Category}/>
        <Drawer.Screen name="Priority" component={Priority}/>
        <Drawer.Screen name="Status" component={Status}/>
        <Drawer.Screen name="Info" component={ChangeInfo}/>
        <Drawer.Screen name="Pass" component={ChangePass}/>
      </Drawer.Navigator>
  );
};

export default todoMain;

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
});

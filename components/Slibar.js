import React,{useEffect,useState} from 'react'
import { StyleSheet, Text, View,ScrollView,Image } from 'react-native'
import {DrawerItemList,DrawerItem,DrawerContentScrollView} from '@react-navigation/drawer'
import { AuthContext } from '../App';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons,FontAwesome5  } from '@expo/vector-icons';
import Info from '../screens/Main/ChangeInfo'
import axios from 'axios'
import URL from '../index'
// import { color } from 'react-native-reanimated';
const Slibar = (props) => {
  const {navigation} = props;
  const { authContext,user} = React.useContext(AuthContext);
  const [info, setInfo] = React.useState({});
  //Lấy thông tin của người dùng
  const getInfo = async () => {
    const res = await axios.get(
      `${URL}/mobile/get/${user}`,
    );
    setInfo(res.data);
  };
  //Khởi chạy việc lấy thông tin khi mới đăng nhập
  useEffect(() => {
    if (user) {
      getInfo();
    }
  }, []);
  return (
        
      
   <ScrollView style={{height:"100%"}} >
   {/* Header -- hiển thị thông tin avatar và tên */}
   <View styles={styles.view}>
   {/* Hình ảnh */}
   <Image
     source={{uri:info.avatar}}
     style={styles.img}
   />
   {/* Tên */}
      <Text style={styles.view} >{info.lastName} {info.firstName}</Text>

   </View>
   {/* Hiển thị danh sách đã truyền vào ở trong file todoMain.js */}
    <View style={styles.body}>
    {/* Chi tiết từng chức năng */}
    <DrawerItem
        icon={(color,size)=>(
          // icon 
          <FontAwesome5 name="home" size={15} color="black" />
      )}
      // Tên chức năng home
        label="Home"
        onPress={() => navigation.navigate('Home')}
      />
    <DrawerItem
    // icon
        icon={(color,size)=>(
          <FontAwesome5 name="clipboard-list" size={15} color="black" />
      )}
      // Tên các chức năng note
        label="Note"
        onPress={() => navigation.navigate('Note')}
      />
    <DrawerItem
    // Icon
        icon={(color,size)=>(
          <FontAwesome5 name="images" size={15} color="black" />
      )}
      // Tên chức năng category
        label="Category"
        onPress={() => navigation.navigate('Category')}
      />
    <DrawerItem
    // icon
        icon={(color,size)=>(
          <FontAwesome5 name="play-circle" size={15} color="black" />
      )}
      // Tên các chức năng Priority
        label="Priority"
        onPress={() => navigation.navigate('Priority')}
      />
    <DrawerItem
        icon={(color,size)=>(
          <FontAwesome5 name="carrot" size={15} color="black" />
      )}
      // Tên chức năng status
        label="Status"
        onPress={() => navigation.navigate('Status')}
      />
    </View>
     <View style={styles.footer}>
      <DrawerItem
      icon={(color,size)=>(
        <FontAwesome5 name="info" size={15} color="black" />
      )}
      // Tên chức năng đổi thông tin
        label="Change Info"
        onPress={() => navigation.navigate('Info')}
      />
      <DrawerItem
      icon={(color,size)=>(
        <FontAwesome5 name="info" size={15} color="black" />
      )}
        label="Change Pass"
        onPress={() => navigation.navigate('Pass')}
      />
      <DrawerItem
       icon={(color,size)=>(
        <FontAwesome5 name="sign-out-alt" size={15} color="black" />
      )}
        label="Out"
        onPress={() => authContext.signOut()}
      />
     </View>
     <View>

     </View>
   </ScrollView>
  )
}

export default Slibar

const styles = StyleSheet.create({
  view:{
    height:50,
    fontSize:15,
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    padding:2
    
  },
  img:{
    width:200,
    height:50,
    borderRadius:5,
  },
  body:{
    paddingTop:2,
    borderBottomWidth:2,
  },
  footer:{
  }
})

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
  console.log(user);
  const [info, setInfo] = React.useState({});
  const getInfo = async () => {
    const res = await axios.get(
      `${URL}/mobile/get/${user}`,
    );
    setInfo(res.data);
  };
  useEffect(() => {
    if (user) {
      getInfo();
    }
  }, []);
  console.log(info);
  return (
        
        
   <ScrollView style={{height:"100%"}} >
   <View styles={styles.view}>
   <Image
     source={{uri:info.avatar}}
     style={styles.img}
   />
      <Text style={styles.view} >{info.lastName} {info.firstName}</Text>

   </View>
    <View style={styles.body}>
    <DrawerItem
        icon={(color,size)=>(
          <FontAwesome5 name="home" size={15} color="black" />
      )}
        label="Home"
        onPress={() => navigation.navigate('Home')}
      />
    <DrawerItem
        icon={(color,size)=>(
          <FontAwesome5 name="clipboard-list" size={15} color="black" />
      )}
        label="Note"
        onPress={() => navigation.navigate('Note')}
      />
    <DrawerItem
        icon={(color,size)=>(
          <FontAwesome5 name="images" size={15} color="black" />
      )}
        label="Category"
        onPress={() => navigation.navigate('Category')}
      />
    <DrawerItem
        icon={(color,size)=>(
          <FontAwesome5 name="play-circle" size={15} color="black" />
      )}
        label="Priority"
        onPress={() => navigation.navigate('Priority')}
      />
    <DrawerItem
        icon={(color,size)=>(
          <FontAwesome5 name="carrot" size={15} color="black" />
      )}
        label="Status"
        onPress={() => navigation.navigate('Status')}
      />
    </View>
     <View style={styles.footer}>
      <DrawerItem
      icon={(color,size)=>(
        <FontAwesome5 name="info" size={15} color="black" />
      )}
        label="Change Info"
        onPress={() => navigation.navigate('Info')}
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
    flex:1
    
  },
  img:{
    width:100,
    height:50,
    borderRadius:50
  },
  body:{
    paddingTop:2,
    borderBottomWidth:2,
  },
  footer:{
  }
})

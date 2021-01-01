import React,{useEffect,useState} from 'react'
import { StyleSheet, Text, View,ScrollView,Image } from 'react-native'
import {DrawerItemList,DrawerItem,DrawerContentScrollView} from '@react-navigation/drawer'
import { AuthContext } from '../App';
import axios from 'axios'
import URL from '../index'
const Slibar = (props) => {
  const {navigation} = props;
  const { authContext,user} = React.useContext(AuthContext);
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
  return (
        
        
   <ScrollView style={{height:"100%"}} >
   <View styles={styles.view}>
   <Image
     source={{uri:info.avatar}}
     style={styles.img}
   />
      <Text style={styles.view} >{info.name}</Text>

   </View>
    <View style={styles.body}>
      <DrawerItemList {...props}/>
      
    </View>
     <View style={styles.footer}>
     <DrawerItem
        label="Close drawer"
        onPress={() => navigation.closeDrawer()}
      />
      <DrawerItem
        label="Out"
        onPress={() => authContext.signOut()}
      />
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

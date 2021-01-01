import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Button,
  FlatList,
  Platform,
  Alert,Modal,TouchableHighlight,TextInput
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AuthContext } from '../../App';
import { FontAwesome } from '@expo/vector-icons';
import Item from '../../components/ItemCate'
import axios from 'axios';

const Category = ({navigation}) => {
  const{user}=useContext(AuthContext)
  const [name,setName]=useState('')
  const [modalVisible, setModalVisible] = useState(false);

  console.log('x',user);
  const [cate,setCate]=useState([])
  const getCate=async ()=>{
    const cate=await axios.get(`https://caso-full-test.herokuapp.com/mobile-cate/get/${user}`);
    setCate(cate.data)
  }
  const createCate=async()=>{

    const newCate={
      name:name,
      idUser:user,
    }
    const res=await axios.post('https://caso-full-test.herokuapp.com/mobile-cate/create',newCate);
    Alert.alert('Ok')
    console.log('moi',res);
    const newCateList=[...cate,res.data];
    setCate(newCateList)
    setModalVisible(!modalVisible);
    setName('')
    
  }
  useEffect(()=>{
    getCate();
  },[navigation])
  const handleDelete=async(id)=>{
    let newCate=cate.map(el=>el);
    newCate=newCate.filter(el=>el._id!==id)
    setCate(newCate)
    await axios.get(`https://caso-full-test.herokuapp.com/mobile-cate/delete/${id}`)
    Alert.alert('DDa xoa')


  }
  return (
    
  
        
        <View style={styles.container}>
      {/* <TouchableOpacity style={{alignItems:"flex-end",margin:16}} onPress={() => navigation.openDrawer()}>
          <FontAwesome name='bars' size={32} color='black' />
        </TouchableOpacity> */}

        <FlatList
          data={cate}
          keyExtractor={item=>`${item._id}`}
          renderItem={({item,index})=>{
            return <Item item={item} navigation={navigation} handleDelete={handleDelete}/>
          }}
      />
     
     <View style={{
          height:50,
          flexDirection:"row",
          justifyContent:"flex-end",
          alignItems:"center"
        }}>
         <TouchableOpacity style={styles.add}
         onPress={()=>setModalVisible(true)}
         
         >
           <Text >+</Text>
         </TouchableOpacity>
        </View>
       
        <Modal transparent={true}  animationType="slide" visible={modalVisible} onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}>
                 <View style={styles.centeredView}>
          <View style={styles.modalView}>
                 <TouchableOpacity style={styles.close} onPress={() => {
                setModalVisible(!modalVisible);
              }}>
                   <Text style={{fontSize:20,}}>X</Text>
                 </TouchableOpacity>
            <TextInput style={styles.input} value={name} onChangeText={text=>setName(text)}/>
            
            <TouchableHighlight style={styles.openButton} onPress={()=>createCate()}>
              <Text>Xác nhận</Text>
            </TouchableHighlight>
          
          </View>
        </View>
        </Modal>
     
    </View>
    
  )
}

export default Category

const styles = StyleSheet.create({
  input:{
    width:200,
    height:20,
    borderColor:'gray',
    borderBottomWidth:1,
    marginBottom:2,
    padding:2,
    fontSize:20,
  },
  close:{
    position:'absolute',
    top:5,
    right:15,
    
    
    justifyContent:'flex-end'
  },
  centeredView: {
    flex:1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor:"transparent"
  },
  modalView: {
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 50,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  scroll:{
    width:'100%',
    padding:16,
    backgroundColor:"red",
    paddingBottom:20,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text: {
    color: '#000',
    fontSize: 20,
    fontWeight: '500',
  },
  add:{
    marginRight:10,
    fontSize:50,
    borderWidth:2,
    height:20,
    width:20,
    borderRadius:50,
   alignItems:'center',
   justifyContent:'center'
  }
});


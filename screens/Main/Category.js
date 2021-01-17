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
import { NavigationContainer,useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AuthContext } from '../../App';
import { FontAwesome } from '@expo/vector-icons';
import Item from '../../components/ItemCate'
import axios from 'axios';
import URL from '../../index'
const Category = ({navigation}) => {
  // Lấy id User
  const{user}=useContext(AuthContext)
  // Khai báo state name
  const [name,setName]=useState('')
  // Khai báo state bật tắt box điền thông tin
  const [modalVisible, setModalVisible] = useState(false);
  // Khai báo state danh sách thể loại của user
  const [cate,setCate]=useState([])
  // Hàm lấy danh sách thể loại của user
  const getCate=async ()=>{
    // Gọi API lấy danh sách theo id
    const cate=await axios.get(`${URL}/mobile-cate/get/${user}`);
    // Gắn là state danh sách đã khai báo
    setCate(cate.data)
  }
  // Hàm thêm thể loại mới
  const createCate=async()=>{
// Khai báo một thể loại mới
    const newCate={
      name:name,
      idUser:user,
    }
    // Gọi api đẩy dữ liệu lên
    const res=await axios.post(`${URL}/mobile-cate/create`,newCate);
    // Thông báo thành công
    Alert.alert('Ok')
    // Cập nhật danh sách thể loại hiện tại
    const newCateList=[...cate,res.data];
    setCate(newCateList)
    // Tắt box điền thông tin
    setModalVisible(!modalVisible);
    // Đưa thanh nhập liệu về trống
    setName('')
    
  }
  // Gọi hàm lấy danh sách thể loại khi vừa mới vào trang thể loại
  useFocusEffect(()=>{
    getCate();
  },[navigation])
  // Hàm xoá thể loại
  const handleDelete=async(id)=>{
  // Khai báo 1 biến chứa danh sách hiện tại
    let newCate=cate.map(el=>el);
    // Cập nhật newCate với danh sách đã xoá thể loại chọn
    newCate=newCate.filter(el=>el._id!==id)
    // Cập nhật danh sách
    setCate(newCate)
    // Gọi api xoá thể loại chọn
    await axios.get(`${URL}/mobile-cate/delete/${id}`)
    // Thông báo đã xoá thành công
    Alert.alert('DDa xoa')


  }
  return (
    
  
        
        <View style={styles.container}>
      {/* <TouchableOpacity style={{alignItems:"flex-end",margin:16}} onPress={() => navigation.openDrawer()}>
          <FontAwesome name='bars' size={32} color='black' />
        </TouchableOpacity> */}

        {/* Danh sách thể loại --> chi tiết từng cái ở components/itemCate.js */}
        <FlatList
          data={cate}
          keyExtractor={item=>`${item._id}`}
          renderItem={({item,index})=>{
            // Truyền dữ liệu và hàm xoá vào chi tiết  --> chi tiết từng cái ở components/itemCate.js
            return <Item item={item} navigation={navigation} handleDelete={handleDelete}/>
          }}
      />
     
     <View style={{
          height:50,
          flexDirection:"row",
          justifyContent:"flex-end",
          alignItems:"center"
        }}>
        {/* Mở box điền thông tin */}
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
            {/* Nút thêm sự kiện onPress */}
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


import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Button,
  FlatList,
  Platform,
  Alert,
  Modal,
  TouchableHighlight,
  TextInput,Dimensions
} from 'react-native';
import URL from '../index'
const Status = ({item,navigation,handleDelete}) => {
  // console.log('item',item);
  const [modalVisible, setModalVisible] = useState(false);
  const [name,setName]=useState(item.name)
  const handleEdit=async()=>{
    const newCate={
      name:name
    }
    await axios.post(`${URL}/mobile-stt/edit/${item._id}`,newCate)
    Alert.alert('Ok')
    setModalVisible(!modalVisible);
  }

  // console.log(item._id);
  return (
    <View>
    <TouchableOpacity onPress={()=>setModalVisible(true)}>
      {/* <Text>{item._id}</Text> */}
      <Text>{name}</Text>
      <Text>{item.createAt}</Text>
    </TouchableOpacity>
      <Modal
        transparent={true}
        animationType='slide'
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}
      >
        <View style={styles.centeredView}  >
          <View style={styles.modalView} >
            <TouchableOpacity
              style={styles.close}
              onPress={() => {
                setModalVisible(!modalVisible);
                setName(item.name)
              }}
            >
              <Text style={{ fontSize: 40 }}>X</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={text=>setName(text)}
            />
            <View style={styles.btnBox}>
            <TouchableHighlight
              style={styles.openButton}
              onPress={() => handleEdit()}
            >
              <Text>Sửa</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.openButton}
              onPress={() => handleDelete(item._id)}
            >
              <Text>Xoá</Text>
            </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default Status

const styles = StyleSheet.create({
  input: {
    width: 200,
    height: 20,
    borderColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 2,
    padding: 2,
    fontSize: 20,
  },
  close: {
    position: 'absolute',
    top: 5,
    right: 15,

    justifyContent: 'flex-end',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'transparent',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 50,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginHorizontal:40
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  scroll: {
    width: '100%',
    padding: 16,
    backgroundColor: 'red',
    paddingBottom: 20,
  },
  img:{
    width:50,
    height:50,
    borderRadius:50,
  },
  btnBox:{
    flexDirection:"row",
    justifyContent:'center',
    alignItems:"center",
  },
  
})

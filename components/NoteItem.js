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
  TextInput,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import URL from '../index'
const NoteItem = ({item,navigation,listCate,listPrio,listStatus,handelDelete}) => {
  //Modal
  const [modalVisible, setModalVisible] = useState(false);
  //Thuộc tính
  const [term, setTerm] = useState(item.name);
  const [status, setStatus] = useState(item.status)
  const [cate, setCate] = useState(item.category)
  const [prio, setPrio] = useState(item.priority)

  
 //DatePicker
   //DatePicker
   const [date, setDate] = useState(new Date(item.plandate));
   const [mode, setMode] = useState('date');
   const [show, setShow] = useState(false);
 
 const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
 const onChange = (event, selectedDate) => {
   const currentDate = selectedDate || date;
   setShow(Platform.OS === 'ios');
   setDate(currentDate);
 };
 const showMode = (currentMode) => {
   setShow(true);
   setMode(currentMode);
 };
 const showDatepicker = () => {
   showMode('date');
 };
 //Xử lý update
 const handleUpdate=async ()=>{
   const newNote={
     name:term,
     status:status,
     priority:prio,
     category:cate,
     plandate:date,
   }
   const res=await axios.post(`${URL}/mobile-note/edit/${item._id}`,newNote);
   Alert.alert(res.data.msg)
   setModalVisible(!modalVisible)
 }
 //Xử lý status
  const handleStatus = (value) => {
    const newValue = value;
    setStatus(newValue)
  }
  //Xử lý prio
 const handlePrio = (value) => {
    const newValue = value;
    setPrio(newValue)
  }
  //Xử lý thể loại
  const handleCate = (value) => {
    const newValue = value;
    setCate(newValue)
  }
  //Xử lý đóng form
  const handleCloseModal=()=>{
    setModalVisible(!modalVisible);
    setCate(item.category);
    setPrio(item.priority);
    setStatus(item.status);
    setDate(new Date(item.plandate));
    setTerm(item.name)
  }
  return (
    <View style={styles.box} >
    {/* <Image
      source={{uri:item.avatar}}
      style={styles.img}
    /> */}
      <TouchableOpacity onPress={()=>setModalVisible(true)}>
      <Text>Name: {term}</Text>
      <Text>Category: {cate}</Text>
      <Text>Priority: {prio}</Text>
      <Text>Status: {status}</Text>
      <Text>PlanDate: {date.getDate()}/{month[date.getMonth()]}/{date.getFullYear()}</Text>
      <Text>CreateAt: {item.createAt}</Text>

      </TouchableOpacity>

      <Modal
        transparent={true}
        animationType='slide'
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.close}
              onPress={() => handleCloseModal()}
            >
              <Text style={{ fontSize: 40 }}>X</Text>
            </TouchableOpacity>
            <TextInput
              placeholder="Nhập tên"
              style={styles.input}
              value={term}
              onChangeText={(text) => setTerm(text)}
            />
            <View>
              <Picker selectedValue={cate} onValueChange={handleCate.bind()} style={{ height: 50, width: 200 }}>
                <Picker.Item label={cate} value={cate} />
                {listCate.map((el,index)=> {
                  return <Picker.Item label={el.name} value={el.name} key={index}/>
                })}
              </Picker>
              <Picker selectedValue={prio} onValueChange={handlePrio.bind()} style={{ height: 50, width: 200 }}>
                <Picker.Item label={prio} value={prio} />
                {listPrio.map((el,index) => {
                  return <Picker.Item label={el.name} value={el.name} key={index}/>
                })}
              </Picker>
              <Picker selectedValue={status} onValueChange={handleStatus.bind()} style={{ height: 50, width: 200 }}>
                <Picker.Item label={status} value={status} />
                {listStatus.map((el,index) => {
                  return <Picker.Item label={el.name} value={el.name} key={index} />
                })}
              </Picker>
            </View>
            <View>
              <View style={styles.date}>
                <View style={styles.textdate}>
                <Text>
                  {date.getDate()}/{month[date.getMonth()]}/
              {date.getFullYear()}

                </Text>
                </View>
                <Text onPress={showDatepicker} style={styles.btn} >...</Text>
              </View>

              {show && (
                <DateTimePicker
                  testID='dateTimePicker'
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  display='default'
                  onChange={onChange}
                />
              )}

            </View>
            <View style={{
              width:200,
              flexDirection:"row",
              justifyContent:'space-between',
              
            }}>
            <TouchableHighlight
              style={styles.openButton}
              onPress={() => handleUpdate()}
            >
              <Text>Cập nhật</Text>
            </TouchableHighlight>
                <TouchableHighlight onPress={()=>handelDelete(item._id)} style={styles.openButton}>
                  <Text>Xoá</Text>
                </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default NoteItem

const styles = StyleSheet.create({
  box:{
    marginBottom:2,
    paddingBottom:3,
    borderBottomColor:"#000",
    borderBottomWidth:1
  },
  textdate: {
    borderWidth: 2,
    borderColor: "#000",
    width: 130,
    height: 25,
    justifyContent: "center",
    textAlign: "center",
    alignItems:"center"
  },
  btn: {
    backgroundColor: "#fff",
    marginRight: 2,
    width: 40,
    height: 25,
    textAlign: "center",
    fontSize: 20,
    borderWidth: 2,
    borderColor: "#000",
  },
  date: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    width: 200
  },
  input: {
    width: 200,
    height: 35,
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
    borderRadius: 20,
    padding: 10,
    elevation: 2,
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
    paddingBottom: 20,
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
  add: {
    marginRight: 10,
    fontSize: 50,
    borderWidth: 2,
    height: 20,
    width: 20,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});


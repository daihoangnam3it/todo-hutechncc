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
import { AuthContext } from '../App';
import { NavigationContainer,useFocusEffect } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import URL from '../index'
import Item from '../components/NoteItem';
const Main = ({ navigation, name }) => {
  const { authContext, user } = React.useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [term, setTerm] = useState('');
  
  //PICKER
  const [statusList,setStatusList]=useState([]);
  const [status,setStatus]=useState('')
  const [cateList,setCateList]=useState([]);
  const [cate,setCate]=useState('')
  const [prioList,setPrioList]=useState([]);
  const [prio,setPrio]=useState('')

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
  const getData=async ()=>{
    const res=await axios.get(`${URL}/mobile-note/get/${user}`);
    console.log(res.data);
    setData(res.data)
  }
  const getStatus=async ()=>{
    const cate=await axios.get(`${URL}/mobile-stt/get/${user}`);
    setStatusList(cate.data)
  }
  const getCate=async ()=>{
    const cate=await axios.get(`${URL}/mobile-cate/get/${user}`);
    setCateList(cate.data)
  }
  const getPrio=async ()=>{
    const cate=await axios.get(`${URL}/mobile-prio/get/${user}`);
    setPrioList(cate.data)
  }
  useFocusEffect(
    React.useCallback(() => {
      getData();
      getStatus();
      getCate();
      getPrio();
    }, [user]));

  const handleStatus=(value)=>{
    const newValue=value;
    setStatus(newValue)
  }
  const handleCate=(value)=>{
    const newValue=value;
    setCate(newValue)
  }
  const handlePrio=(value)=>{
    const newValue=value;
    setPrio(newValue)
  }
  const handleCreate=async()=>{
    const newNote={
      name:term,
      idUser:user,
      status:status,
      category:cate,
      priority:prio,
      plandate:date
    }
    // console.log(newNote);
    const res=await axios.post(`${URL}/mobile-note/create`,newNote)
    console.log(res);
    let newData=[...data,res.data]
    setData(newData)
    setModalVisible(!modalVisible);
    setCate('');
    setTerm('')
    setDate(new Date())
    setPrio('')
    setStatus('')
  }
  return (
    <View style={styles.container}>
    {/* <TouchableOpacity
      style={{ alignItems: 'flex-end', margin: 16 }}
      onPress={() => navigation.openDrawer()}
    >
      <FontAwesome name='bars' size={32} color='black' />
    </TouchableOpacity> */}

    <FlatList
      data={data}
      keyExtractor={(item) => `${item}`}
      renderItem={({ item, index }) => {
        return <Item item={item} navigation={navigation} />;
      }}
      contentContainerStyle={styles.scroll}
    />

    <View
      style={{
        height: 50,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}
    >
      <TouchableOpacity
        style={styles.add}
        onPress={() => setModalVisible(true)}
      >
        <Text>+</Text>
      </TouchableOpacity>
    </View>
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
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
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
            <Picker selectedValue={cate} onValueChange={handleCate.bind()}  style={{height: 50, width: 200}}>
                <Picker.Item label="Chọn thể loại" value="0" />
               {cateList.map(el=>{
                 return <Picker.Item label={el.name} value={el.name}/>
               })}
            </Picker>
            <Picker selectedValue={prio} onValueChange={handlePrio.bind()} style={{height: 50, width: 200}}>
                <Picker.Item label="Chọn ưu tiên" value="0" />
                {prioList.map(el=>{
                 return <Picker.Item label={el.name} value={el.name}/>
               })}
            </Picker>
            <Picker selectedValue={status} onValueChange={handleStatus.bind()} style={{height: 50, width: 200}}>
                <Picker.Item label="Chọn trạng thái" value="0" />
                {statusList.map(el=>{
                  return <Picker.Item label={el.name} value={el.name}/>
                })}
            </Picker>
          </View>
          <View>
            <View style={styles.date}>
            <Text style={styles.textdate}>
              {date.getUTCDate()}/{month[date.getUTCMonth()]}/
              {date.getFullYear()}
            </Text>
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
          <TouchableHighlight
            style={styles.openButton}
            onPress={() => handleCreate()}
          >
            <Text>Xác nhận</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  </View>
);
};

export default Main;

const styles = StyleSheet.create({
textdate:{
  borderWidth:2,
  borderColor:"#000",
  width:130,
  height:25,
  justifyContent:"center",
  textAlign:"center",
},
btn:{
  backgroundColor:"#fff",
  marginRight:2,
  width:40,
  height:25,
  textAlign:"center",
  fontSize:20,
  borderWidth:2,
  borderColor:"#000",
},
date:{
  flexDirection:"row",
  justifyContent:"space-between",
  alignItems:"center",
  marginBottom:20,
  width:200
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

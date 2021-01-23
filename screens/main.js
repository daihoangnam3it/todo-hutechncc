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
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import URL from '../index'
import Item from '../components/NoteItem';
const Main = ({ navigation, name }) => {
  //Xác thực tài khoản khi đăng nhập
  const { authContext, user } = React.useContext(AuthContext);
  //Khai báo Modal
  const [modalVisible, setModalVisible] = useState(false);
  //Khai báo DatePicker
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);


  //Khai báo thuộc tính
  const [term, setTerm] = useState('');
  const [statusList, setStatusList] = useState([]);
  const [status, setStatus] = useState('')
  const [cateList, setCateList] = useState([]);
  const [cate, setCate] = useState('')
  const [prioList, setPrioList] = useState([]);
  const [prio, setPrio] = useState('')

  //Xét tháng trong DatePicker
  const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };
  // Hiển thị box khi nhấn vào 
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  // Hiển thị box thời gian khi nhấn vào
  const showDatepicker = () => {
    showMode('date');
  };


  //Xử lý note
  const getData = async () => {
    const res = await axios.get(`${URL}/mobile-note/get/${user}`);
    setData(res.data)
  }
  // Xử lý thêm 1 note
  const handleCreate = async () => {
    // Khai báo 1 note mớI
    const newNote = {
      name: term,
      idUser: user,
      status: "Chưa làm",
      category: cate,
      priority: prio,
      plandate: date
    }
    // console.log(newNote);
    // Update note
    const res = await axios.post(`${URL}/mobile-note/create`, newNote)
    // Cập nhật danh sách note
    let newData = [...data, res.data]
    // Cập nhật danh sách note hiển thị
    setData(newData)
    // Tắt box
    setModalVisible(!modalVisible);
    setCate('');
    setTerm('')
    // Cập nhật ngày đã chọn
    setDate(new Date())
    // Trả về giá trị trống
    setPrio('')
    setStatus('')
  }
  //Xử lý xoá note
  const handelDelete=async(id)=>{
    // Gọ API xoá note
    const res=await axios.get(`${URL}/mobile-note/delete/${id}`);
    // Cập nhật danh sách note hiện tại
    let newData=data.map(el=>el);
    newData=newData.filter(el=>el._id!==id)
    setData(newData);
    // Hiển thị thông báo
    Alert.alert(res.data.msg)
  }

  //Xử lý status
  const getStatus = async () => {
    // Gọi API lấy danh sách status
    const cate = await axios.get(`${URL}/mobile-stt/get/${user}`);
    // Gán danh sách note
    setStatusList(cate.data)
  }
  // Xử lý chọn status
  const handleStatus = (value) => {
    const newValue = value;
    // Cập nhật giá trị status
    setStatus(newValue)
  }
  //Xử lý thể loại
  const getCate = async () => {
    // Gọi API lấy danh sách thể loại
    const cate = await axios.get(`${URL}/mobile-cate/get/${user}`);
    // Cập nhật danh sách thể loại
    setCateList(cate.data)
  }
  // Chọn thể loại 
  const handleCate = (value) => {
    const newValue = value;
    // Cập nhật giá trị thể loại đã chọn
    setCate(newValue)
  }
  //Xử lý prio
  const getPrio = async () => {
    // Gọi API lấy danh sách Prio
    const cate = await axios.get(`${URL}/mobile-prio/get/${user}`);
    setPrioList(cate.data)
  }
  const handlePrio = (value) => {
    const newValue = value;
    setPrio(newValue)
  }
  // Chạy các chức năng khi vừa vào trang
  useFocusEffect(
    React.useCallback(() => {
      getData();
      getStatus();
      getCate();
      getPrio();
    }, [user]));


  return (
    <View style={styles.container}>
      {/* <TouchableOpacity
      style={{ alignItems: 'flex-end', margin: 16 }}
      onPress={() => navigation.openDrawer()}
    >
      <FontAwesome name='bars' size={32} color='black' />
    </TouchableOpacity> */}
      {/* Hiển thị danh sách các note hiện tại */}
      <FlatList
        data={data}
        keyExtractor={(item) => `${item._id}`}
        renderItem={({ item, index }) => {
          return <Item
            item={item}
            navigation={navigation}
            listCate={cateList}
            listPrio={prioList}
            listStatus={statusList}
            handelDelete={handelDelete}
          />;
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
      {/* Nút thêm */}
        <TouchableOpacity
          style={styles.add}
          onPress={() => setModalVisible(true)}
        >
          <Text>+</Text>
        </TouchableOpacity>
      </View>
      {/* Box thêm sản phẩm */}
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
          {/* Nút tắt box */}

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
              <Picker selectedValue={cate} onValueChange={handleCate.bind()} style={{ height: 50, width: 200 }}>
                <Picker.Item label="Chọn thể loại" value="0" />
                {cateList.map(el => {
                  return <Picker.Item label={el.name} value={el.name} />
                })}
              </Picker>
              <Picker selectedValue={prio} onValueChange={handlePrio.bind()} style={{ height: 50, width: 200 }}>
                <Picker.Item label="Chọn ưu tiên" value="0" />
                {prioList.map(el => {
                  return <Picker.Item label={el.name} value={el.name} />
                })}
              </Picker>
              {/* <Picker selectedValue={status} onValueChange={handleStatus.bind()} style={{ height: 50, width: 200 }}>
                <Picker.Item label="Chọn trạng thái" value="0" />
                {statusList.map(el => {
                  return <Picker.Item label={el.name} value={el.name} />
                })}
              </Picker> */}
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
  textdate: {
    borderWidth: 2,
    borderColor: "#000",
    width: 130,
    height: 25,
    justifyContent: "center",
    alignItems:'center'
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

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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AuthContext } from '../App';
import { FontAwesome } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

import axios from 'axios';
import Item from '../components/NoteItem';
const todoMain = ({ navigation, name }) => {
  const { authContext, user } = React.useContext(AuthContext);
  const [info, setInfo] = React.useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState(['a', 'b', 'c', 'd', 'e', 'f']);
  const [term, setTerm] = useState('');
  const [date, setDate] = useState(new Date());
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
  const getInfo = async () => {
    const res = await axios.get(
      `https://caso-full-test.herokuapp.com/mobile/get/${user}`,
    );
    setInfo(res.data.name);
  };
  const handleNote = () => {
    const noteNew = {
      idUser: user,
      term: term,
    };
    const newData = [...data, term];
    setData(newData);
    setModalVisible(!modalVisible);
    setTerm('');
  };
  // const getData=async ()=>{
  //   const res=await axios.get('https://caso-full-test.herokuapp.com/mobile/get-all');
  //   setData(res.data)
  // }
  // console.log(data);
  // useEffect(() => {
  //   if (user) {
  //     // getInfo();
  //     getData();
  //   }
  // }, [user]);
  const Drawer = createDrawerNavigator();
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
              <Text style={{ fontSize: 20 }}>X</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              value={term}
              onChangeText={(text) => setTerm(text)}
            />
            <View>
              <View>
                <Button onPress={showDatepicker} title='Show date picker!' />
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
              <Text>
                {date.getUTCDate()}/{month[date.getUTCMonth()]}/
                {date.getFullYear()}
              </Text>
            </View>
            <TouchableHighlight
              style={styles.openButton}
              onPress={() => handleNote()}
            >
              <Text>Xác nhận</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default todoMain;

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
    backgroundColor: 'red',
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

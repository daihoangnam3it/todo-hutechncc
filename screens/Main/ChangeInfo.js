import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View, TextInput,Image, Alert} from 'react-native'
import { AuthContext } from '../../App';
import URL from '../../index'
import axios from 'axios';
import { NavigationContainer,useFocusEffect  } from '@react-navigation/native';

const ChangeInfo = () => {
  // Lấy ID thông tin tài khoản

  const { authContext, user } = React.useContext(AuthContext);
  // Khai báo các state thông tin
  const [info, setInfo] = React.useState({});
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [avatar,setAvatar]=React.useState('');
// Gọi API lấy thông tin tài khoản

  const getInfo = async () => {
    const res = await axios.get(
      `${URL}/mobile/get/${user}`,
    );
    setInfo(res.data);
    // Gán giá trị tên đầu
    setFirstName(res.data.firstName)
    // Gán giá trị tên sau
    setLastName(res.data.lastName)
    // gán avatar
    setAvatar(res.data.avatar)
  };
  // Khởi chạy lấy thông tin tài khoản khi vào chức năng
  useFocusEffect(
    React.useCallback(() => {
     getInfo();
    }, []));
    // Hàm xử lý đổi thông tin
  const handleChangeInfo=async ()=>{
    // Tạo thông tin mớiiii
    const newInfo={
      firstName:firstName,
      lastName:lastName
    }
    // Gửi thông tin lên
    const res=await axios.post(`${URL}/mobile/edit/${user}`,newInfo);
    // Hiển thị thông báo kết quả
    Alert.alert(res.data.msg)
  }
  return (
    <View style={styles.container}>
      {/* <Text>{mess}</Text> */}
      {/* <StatusBar hidden /> */}
      <Image    source={{uri:avatar}} style={styles.img} />
      <Text>Thông tin</Text>
      <TextInput
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
        placeholder='Tên đầu'
        style={styles.textInput}
      />
      <TextInput
        value={lastName}
        onChangeText={(text) => setLastName(text)}
        placeholder='Tên sau'
        style={styles.textInput}
      />
      <Text
        style={styles.button}
        onPress={async () => {
          handleChangeInfo()
        }}
      >
        Cập nhật
      </Text>
      
    </View>
  )
}

export default ChangeInfo
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    width: '100%',
    borderWidth: 2,
    height: 50,
    borderColor: '#000',
    paddingLeft: 5,
    color: '#000',
    fontSize: 25,
    marginBottom: 10,
    borderRadius: 2,
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  button: {
    textAlign: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 2,
  },
});
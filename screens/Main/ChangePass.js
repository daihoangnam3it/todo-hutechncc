import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View, TextInput,Image, Alert} from 'react-native'
import { AuthContext } from '../../App';
import URL from '../../index'
import axios from 'axios';
import { NavigationContainer,useFocusEffect  } from '@react-navigation/native';

const ChangeInfo = () => {
  // Lấy ID thông tin tài khoản
  const { authContext, user } = React.useContext(AuthContext);
  const [info, setInfo] = React.useState({});
  const [passCurrent, setPassCurrent] = React.useState('');
  const [pass, setPass] = React.useState('');
  const [passT,setPassT]=React.useState('');
  const [avatar,setAvatar]=React.useState('');
// Gọi API lấy thông tin tài khoản
  const getInfo = async () => {
    const res = await axios.get(
      `${URL}/mobile/get/${user}`,
    );
    // Gán giá trị thông tin
    setInfo(res.data)
    // Gán avatar
    setAvatar(res.data.avatar)

  };
  // Khởi chạy lấy thông tin tài khoản khi vào chức năng
  useFocusEffect(
    React.useCallback(() => {
     getInfo();
    }, []));
    // Hàm xử lý đổi mật khẩu
  const handleChangePass=async ()=>{
    // gửi thông tin tài khoản
    const newInfo={
      password:pass,
    }
    // Check mật khẩu hiện tại
    if(passCurrent!==info.password)
      return Alert.alert('Mật khẩu hiện tại không đúng')
    if(pass!==passT){
      return Alert.alert('Mật khẩu nhập lại không trùng')
    }
    const res=await axios.post(`${URL}/mobile/change-pass/${user}`,newInfo);
    Alert.alert(res.data.msg)
  }
  return (
    <View style={styles.container}>
      {/* <Text>{mess}</Text> */}
      {/* <StatusBar hidden /> */}
      <Image    source={{uri:avatar}} style={styles.img} />
      <Text>Thông tin</Text>
      <TextInput
        value={passCurrent}
        secureTextEntry={true}
        onChangeText={(text) => setPassCurrent(text)}
        placeholder='Mật khẩu hiện tại'
        style={styles.textInput}
      />
      <TextInput
        value={pass}
        secureTextEntry={true}
        onChangeText={(text) => setPass(text)}
        placeholder='Mật khẩu 1'
        style={styles.textInput}
      />
      <TextInput
        value={passT}
        secureTextEntry={true}
        onChangeText={(text) => setPassT(text)}
        placeholder='Mật khẩu 2'
        style={styles.textInput}
      />
      <Text
        style={styles.button}
        onPress={async () => {
          handleChangePass()
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
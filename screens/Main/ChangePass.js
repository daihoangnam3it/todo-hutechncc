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
  // Khai báo biến pass hiện tại -- setPassCurrent dùng khi muốn cập nhật passCurrent
  const [passCurrent, setPassCurrent] = React.useState('');
  // Khai báo biến pass 1 -- setPass dùng khi muốn cập nhật pass
  const [pass, setPass] = React.useState('');
  // Khai báo biến pass 2 setPassT dùng khi muốn cập nhật passT
  const [passT,setPassT]=React.useState('');
  // Khai báo biến avatar -- setAvatar dùng khi cập nhật biến avatar
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
      {/* Chỗ để nhập pass hiện tại*/}
      <TextInput
        value={passCurrent}
        secureTextEntry={true}
        // Cập nhật biến pass hiện tại
        onChangeText={(text) => setPassCurrent(text)}
        placeholder='Mật khẩu hiện tại'
        style={styles.textInput}
      />
      {/* Chỗ để nhập pass lần 1 */}
      <TextInput
        value={pass}
        secureTextEntry={true}
        // Cập nhật biến pass 1
        onChangeText={(text) => setPass(text)}
        placeholder='Mật khẩu 1'
        style={styles.textInput}
      />
      {/* Chỗ để nhập pass lần 2 */}
      <TextInput
        value={passT}
        secureTextEntry={true}
        // Cập nhật biến pass 2
        onChangeText={(text) => setPassT(text)}
        placeholder='Mật khẩu 2'
        style={styles.textInput}
      />
      {/* Nút bấm */}
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
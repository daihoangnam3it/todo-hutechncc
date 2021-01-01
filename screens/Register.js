import React, { useContext } from 'react';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  StatusBar,
  Image,
  Button,
  Alert,
  TouchableOpacity
} from 'react-native';
import axios from 'axios';
import cover from '../assets/cover.jpg';
import Loading from '../components/Loading'
import URL from '../index'
const Register = ({ navigation }) => {
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const [passt, setPasst] = useState('');
  const [mess, setMess] = useState('');
  const [loading,setLoading]=useState(false)
  const validate = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      console.log('Looi');
      return true
    }
   
  }
  const handleRegister= async () => {
    const user = {
      name: name,
      password: pass,
      pass2: passt,
    };
    if(validate(name)){
      return setMess('Email sai định dạng')
    }
    if (pass !== passt) {
      return setMess('Mật khẩu không trùng');
    } else {
      try{
        setName('');
        setPass('');
        setPasst('');
        setMess('');
        await axios.post(
          `${URL}/mobile/create`,
          user,
        );
        Alert.alert('Thành công')
        navigation.navigate('Login');

      }catch(err){
        err.response.data.msg && setMess(err.response.data.msg)
        
      }
      
    }
  };

  
  return (
    <View style={styles.container}>
      <Text>{mess}</Text>
      <StatusBar hidden />
      <Image source={cover} style={styles.img} />
      <Text>Đăng ký</Text>
      <TextInput
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder='Tên đăng nhập'
        style={styles.textInput}
      />
      <TextInput
        value={pass}
        secureTextEntry={true}
        onChangeText={(text) => setPass(text)}
        placeholder='Mật khẩu'
        style={styles.textInput}
      />
      <TextInput
        value={passt}
        secureTextEntry={true}
        onChangeText={(text) => setPasst(text)}
        placeholder='Mật khẩu lần 2'
        style={styles.textInput}
      />
      <Text
        style={styles.button}
        onPress={async () => {
          handleRegister();
        }}
      >
        Đăng ký
      </Text>
      <Loading loading={loading}/>
      
    </View>
  );
};

export default Register;

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

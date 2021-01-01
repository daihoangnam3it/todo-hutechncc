import React, { useContext, useEffect } from 'react';
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
  RefreshControl,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import cover from '../assets/cover.jpg';
import {AuthContext} from '../App'
const Login = ({navigation}) => {
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const {authContext,mess} = useContext(AuthContext)
  console.log(mess);
  // const handleLogin = async () => {
  //   const user = {
  //     name: name,
  //     password: pass,
  //   };
  //   try {
  //     const res = await axios.post(
  //       'https://caso-full-test.herokuapp.com/mobile/login',
  //       user,
  //     );
  //     Alert.alert('ok');
  //     AsyncStorage.setItem('@Login','ok');
  //     setTimeout(() => {
  //       navigation.navigate('AuthStack')
  //     }, 3000);
     
  //   } catch (err) {
  //     err.response.data.msg && Alert.alert(err.response.data.msg);
  //   }
  //   setName('');
  //   setPass('');
  //   getDocs();
  // };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Text>{mess}</Text>
      <Image source={cover} style={styles.img} />
      <Text>Đăng nhập</Text>
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
      <Text style={styles.button} onPress={
        () => 
        authContext.signIn(name,pass)
        }
        >
        Đăng nhập
      </Text>
      <Text style={styles.button} onPress={()=>navigation.navigate('Register')}>Chưa có tài khoản </Text>
    </View>
  );
};

export default Login;

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

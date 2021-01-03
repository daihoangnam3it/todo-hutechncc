import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import { AuthContext } from '../../App';
import URL from '../../index'
import axios from 'axios';
import { NavigationContainer,useFocusEffect  } from '@react-navigation/native';

const ChangeInfo = () => {
  const { authContext, user } = React.useContext(AuthContext);
  const [info, setInfo] = React.useState({});
  const [name, setName] = React.useState('');

  const getInfo = async () => {
    const res = await axios.get(
      `${URL}/mobile/get/${user}`,
    );
    setInfo(res.data);
    setName(res.data.firstName)
  };
  useFocusEffect(
    React.useCallback(() => {
     getInfo();
    }, []));
  return (
    <View>
      <Text>{name}</Text>
    </View>
  )
}

export default ChangeInfo

const styles = StyleSheet.create({})

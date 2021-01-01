import React from 'react'
import { StyleSheet, Text, View,Image } from 'react-native'

const NoteItem = ({item,navigation}) => {
  // console.log('item',item);
  return (
    <View>
    {/* <Image
      source={{uri:item.avatar}}
      style={styles.img}
    /> */}
      <Text>{item.name}</Text>
      {item.createAt?<Text>{item.createAt}</Text>:null}
    </View>
  )
}

export default NoteItem

const styles = StyleSheet.create({
  img:{
    width:50,
    height:50,
    borderRadius:50,
  }
})

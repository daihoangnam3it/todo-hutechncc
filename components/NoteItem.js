import React from 'react'
import { StyleSheet, Text, View,Image } from 'react-native'

const NoteItem = ({item,navigation}) => {
  // console.log('item',item);
  const date=new Date(item.plandate);
  const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return (
    <View style={styles.container}>
    {/* <Image
      source={{uri:item.avatar}}
      style={styles.img}
    /> */}
      <Text>Name: {item.name}</Text>
      <Text>Category: {item.category}</Text>
      <Text>Priority: {item.priority}</Text>
      <Text>Status: {item.status}</Text>
      <Text>PlanDate: {date.getDate()}/{month[date.getMonth()]}/{date.getFullYear()}</Text>
      <Text>CreateAt: {item.createAt}</Text>

     
    </View>
  )
}

export default NoteItem

const styles = StyleSheet.create({
  container:{
    marginBottom:5
  },  
  img:{
    width:50,
    height:50,
    borderRadius:50,
  }
})

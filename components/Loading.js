import React from 'react'
import { StyleSheet, Text, View,ActivityIndicator } from 'react-native'

const Loading = ({loading}) => {
  if(!loading){
    return <View/>
  }
  return (
    <View style={styles.overlay}>
    <View>
      <ActivityIndicator>
        <Text>Loading.....</Text>
      </ActivityIndicator>

    </View>
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({
  overlay:{
    ...StyleSheet.absoluteFill,
  alignItems:'center',
  justifyContent:'center',
  backgroundColor:'black'
  },
})

import React from 'react'
import { View ,StyleSheet, Image} from 'react-native'
export default function Header(){
  return (
    <View  style={styles.header}>
        <View style={styles.menu}>
            <Image style={styles.img} source={require('../images/bg.png')}/>
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
      header:{
            height:100,
            paddingTop:30,
            marginTop:30,
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection:'row',
                padding:10,},
      menu:{
        position:"absolute",
        top:25,
        right:10,
        width:180,
        height:50
      },
      img:{
        width:"100%",
        height:"100%",
      }
})
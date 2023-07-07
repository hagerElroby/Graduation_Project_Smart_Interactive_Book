import React , {useEffect} from 'react'
import {View , Text ,Image , StyleSheet} from 'react-native'
import { useNavigation } from '@react-navigation/native';
const Splash = () => {

 const navigation = useNavigation();
 useEffect(()=>{
      setTimeout(()=>{
            navigation.navigate('Main');
            
      },7000);});
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>EduEdge</Text>
    </View>
  )
}
export default Splash
const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: "#9c27b0",
        alignItems: "center",
        justifyContent: "center",
        flexDirection:'column',
      },
      logo:{
        color:"#fff",
        fontWeight:'bold',
        fontSize:35
      }
    });
    
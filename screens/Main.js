import React from 'react'
import { StyleSheet, Text, View,Image , TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header'
import {MaterialIcons} from '@expo/vector-icons'
import Home from './Home';
export default function Main() {
  const navigation = useNavigation();
    return (
      <View>
          <Header/>

          <View style={styles.div}>
            <View style={styles.main}>
              <MaterialIcons name="menu-book" size={30} color="black" />
              <Text style={styles.text}>My Books Shelf</Text>
            </View>
            <View style={styles.content}>
                <View style={styles.item} >
                  <TouchableOpacity onPress={()=>{navigation.navigate('Home')}}>
                    <Image style={styles.img} source={require('../images/bio-2.jpg')}/>
                  </TouchableOpacity>
                </View>
                
                <View style={styles.item}>
                  <Image style={styles.img}  source={require('../images/bio-2.jpg')}/>
                </View>
                <View style={styles.item}>
                  <Image style={styles.img}  source={require('../images/bio-2.jpg')}/>
                </View>
                <View style={styles.item}>
                  <Image style={styles.img}  source={require('../images/bio-2.jpg')}/>
                </View>
            </View>
          </View>
      </View>
    )
  }

const styles = StyleSheet.create({
      main:{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection:'row', 
            paddingTop:20,
      },
    text:{
          fontSize:23,
          fontWeight:'bold',
          marginLeft:5,
          color:'#000',     
    },
  content:{
      flexDirection:'row',
      flexWrap:'wrap',
      width:'100%'
    } ,
  item:{
      width:'40%',
      marginLeft:25,
      marginBottom:10,
      marginTop:50,
      height:150,
      borderRadius:10,
    },
    img:{
      width:'99%',
      height:'99%',
      borderRadius:10,
      resizeMode: 'stretch'
    }
})


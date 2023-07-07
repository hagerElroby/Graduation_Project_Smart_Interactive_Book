import React from 'react';
import {MaterialCommunityIcons,MaterialIcons} from '@expo/vector-icons'
import {View,Text,StyleSheet} from 'react-native';
import {DrawerContentScrollView,DrawerItemList,} from '@react-navigation/drawer';
const CustomDrawer = props => {
  return (
    <View style={{flex: 1}}>
        <DrawerContentScrollView {...props} >
              <DrawerItemList {...props} />
        </DrawerContentScrollView>
        <View style={styles.container}>
              <Text style={styles.text}>Stay In Touch</Text>
              <View style={styles.icon}>
                  <MaterialCommunityIcons name="web" size={24} color="black"  style={styles.web}/>
                  <MaterialIcons name="email" size={24} color="black" />
              </View>
        </View>
    </View>
  );
};
export default CustomDrawer;
const styles = StyleSheet.create({
    container:{
    padding:5,
    backgroundColor: '#dcdfe1' 
    },
    text:{
      fontSize:15
    },
    icon:{
    justifyContent: 'flex-end',
      alignItems: 'center',
      flexDirection:'row',
      margin:5
    },
    web:{
    marginLeft:10,
    marginRight:20
   }
})






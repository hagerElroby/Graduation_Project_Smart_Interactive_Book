import React, { Component } from 'react';
import { View, StyleSheet ,ScrollView } from 'react-native';
import {
  MenuContext,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from 'react-native-popup-menu';
import * as data from '../data.json'
const myContents=data.glossary;
const keywords = data.glossary.keywords
export default class Glossary extends Component {
  render() {
    return (
      <ScrollView>
        <MenuProvider style={styles.container}>
            {myContents.map((item)=>
                  <View>
                    <Menu>
                        <MenuTrigger style={styles.button} text={`${item.word.toUpperCase()}`} />
                        <MenuOptions style={styles.modalBackGround}>
                          <MenuOption  text={`Dfinition: ${item.definition}`}  style={styles.modalContainer}/>
                        </MenuOptions>
                    </Menu>
                </View>
            )}
      </MenuProvider>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    backgroundColor: '#ecf0f1',
    position:'relative'
  },
  modalBackGround: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft:-100,
    position:'absolute',
    top:10,
    right:25,
    width:300,
    minHeight:200
  },
  modalContainer: {
    width: '90%',
    height:'90%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  button:{
  backgroundColor: '#c14fd596',
  padding: 13,
  borderRadius: 5,
  textalign: 'center',
  display: 'flex',
  fontsize: 20,
  margin: 3,
  width:300
  }});
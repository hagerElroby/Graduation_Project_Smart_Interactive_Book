import { useEffect , useState } from 'react';
import { StyleSheet} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React,{Component} from "react";
import { WebView } from 'react-native-webview';
import * as data from '../data.json'
const Drawer = createDrawerNavigator();
const  myContents =  data.contents;
export default function ObjectLibrary() {
   const WebViewComponent = ({ url}) => {
      if (url)  {return <WebView source={{ uri: url }} style={{ flex: 1 }} /> }
  }
  return (
          <NavigationContainer independent={true}>
            <Drawer.Navigator > 
              {myContents.map((item)=>{
                  if(item.interactiveObject){
                      if (Array.isArray(item.interactiveObject)) {
                          // If interactiveObject is an array, render a separate screen for each item
                          return item.interactiveObject.map((io, index) => (
                            <Drawer.Screen
                              key={`${item.name}-${index}`}
                              name={`${item.name} ${index+1}`}
                              component={() => (
                                <>
                                  <WebViewComponent url={io.url} />
                                </>
                              )}
                            />
                          ));
                      } else if (item.interactiveObject) {
                  // If interactiveObject is an object, render the screen with the WebViewComponent
                            return (
                              <Drawer.Screen
                                key={item.name}
                                name={`${item.name}`}
                                component={() => (
                                  <>
                                    <WebViewComponent url={item.interactiveObject.url} />
                                  </>
                                )}
                              />
                            );
                          } else {
                  // If interactiveObject is not defined, don't render a screen for this item
                            return null;
                        }
                        }})}
              </Drawer.Navigator>
            </NavigationContainer>
          );
 }
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
  });
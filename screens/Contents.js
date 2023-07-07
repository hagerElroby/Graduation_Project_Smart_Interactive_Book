  import { useEffect , useState } from 'react';
  import { StyleSheet, StatusBar ,View ,Text , TouchableOpacity,Button ,localStorage} from 'react-native';
  import QuillEditor, { QuillToolbar , QuillDeltaToHtmlConverter, CustomModule } from 'react-native-cn-quill';
  import { createDrawerNavigator } from '@react-navigation/drawer';
  import { NavigationContainer } from '@react-navigation/native';
  import React,{Component} from "react";
  import { WebView } from 'react-native-webview';
  import * as Speech from 'expo-speech'
  import SoundPlayer from 'react-native-sound-player'
  // import { Asset } from 'expo-asset';
  import Bookmarks from './Bookmarks';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import {MaterialIcons , Ionicons} from '@expo/vector-icons'
  import * as data from '../data.json'

  const Drawer = createDrawerNavigator();
  const  myContents =  data.contents;

  function Voice(props){ 
      const [isSpeaking, setIsSpeaking] = useState(false);
      const handleVoice = () => {
        setIsSpeaking(!isSpeaking);
        if (isSpeaking) {
          Speech.speak(`${props.narrationText}`);
        } else {
          Speech.stop();
        }
      };
      
      return(
              <View style={{flexDirection:'row',justifyContent:"space-around" ,backgroundColor:"#fff",paddingTop:10}}>
                  <TouchableOpacity onPress={()=>handleVoice()}>
                      <Ionicons name="musical-notes-sharp" style={styles.music} size={24} color={isSpeaking ? '#000': '#9c27b096'  } />
                  </TouchableOpacity>          
              </View>
    )
  } 
function CustomCompontent(props){
      const _editor = React.createRef(null);
      useEffect(() => {
        _editor.current?.enable(false)
    }, [])

    return(
            <>
              <QuillEditor
                    style={styles.editor}
                    ref={_editor}
                    initialHtml={props.text} 
                    modules={[QuillDeltaToHtmlConverter]}
                />
              <View style={styles.toolbar}>
                  <QuillToolbar editor={_editor}  style={styles.options}
                    options={[['bold','italic','underline'],
                              [{ header: [1, 2, 3, 4, 5, 6, false] }]
                              ,[{ color: [] },{background:[]}],]} theme="light"/>   
              </View>            
            </>             
    )}

const WebViewComponent = ({ url}) => {
   if (url)  {return <WebView source={{ uri: url }} style={{ flex: 1 }} /> }
}


const Contents=({addBookmark , removeBookmark, bookmarks})=> {
      const handleAddBookmark = (item) => {
        const bookmarkExists = bookmarks.some((bookmark) => bookmark.name === item.name);
        if (bookmarkExists) {
          removeBookmark(item);
        } else {
          addBookmark(item);
        }
      };
    return (
      <NavigationContainer independent={true}>
        <Drawer.Navigator > 
          {myContents.map((item)=><Drawer.Screen name={`${item.name}`}  
              component={() => <>
                  <WebViewComponent url={item?.interactiveObject?.url} text={`${item?.text?.en}`}/>
                  <CustomCompontent text={`${item?.text?.en}`} narrationText={`${item?.narrationText?.ar}`}/>
                  <TouchableOpacity onPress={() => handleAddBookmark(item)}>
                        <Ionicons
                          name="star"
                          size={24}
                          style={styles.star}
                          color={bookmarks.some((bookmark) => bookmark.name === item.name) ? '#9c27b096' : 'black'}
                        />
  <Voice narrationText={`${item?.narrationText?.en}`} />
</TouchableOpacity>

              </>}/>)
          }
        </Drawer.Navigator>
      </NavigationContainer>
    );
 }
 export default Contents;

const styles = StyleSheet.create({
  title: {  
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingVertical: 10,
  },
  root: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: '#eaeaea',
  },
  toolbar: {
    backgroundColor: '#9c27b096',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    width:400 
  },
  editor: {
    paddingLeft: 20,
    fontSize: 16,
    lineHeight: 14,
    textAlignVertical: 'top',
  },
  star:{
    position:"absolute",
    bottom:20, 
    left:15
  },
  music:{
    position:"absolute",
    bottom:20, 
    right:90
  }});



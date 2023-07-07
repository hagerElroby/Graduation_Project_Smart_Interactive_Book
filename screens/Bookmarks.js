import { StyleSheet ,View ,Text , TouchableOpacity ,Button } from 'react-native';
import { useEffect , useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React,{Component} from "react";
import QuillEditor, { QuillToolbar , QuillDeltaToHtmlConverter, CustomModule } from 'react-native-cn-quill';
import { WebView } from 'react-native-webview';
import * as Speech from 'expo-speech'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MaterialIcons , Ionicons} from '@expo/vector-icons'

const Drawer = createDrawerNavigator();
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
  )} 
  function CustomCompontent(props){
      const _editor = React.createRef(null);
      useEffect(() => {
        _editor.current?.enable(false)
    }, [])

    return(
      <> 
        <QuillEditor style={styles.editor} ref={_editor} initialHtml={props.text}/>
        <View style={styles.toolbar}>
            <QuillToolbar editor={_editor} options={[['bold','italic','underline']
                                                    ,[{ header: [1, 2, 3, 4, 5, 6, false] }]
                                                    ,[{ color: [] },{background:[]}],]} 
                                                    theme="light" />
        </View>
      </>           
)}

const WebViewComponent = ({ url}) => {
if (url)  {return <WebView source={{ uri: url }} style={{ flex: 1 }} /> }
}

const Bookmarks = ({ bookmarks }) => {
  useEffect(() => {
    AsyncStorage.getItem('bookmarks').then((result) => {
      if (result) {
        setBookmarks(JSON.parse(result));
      }
    });
  }, []);

  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator > 
        {bookmarks.length > 0 ? (
          bookmarks.map((bookmark, index) => (
            <Drawer.Screen
              key={index}
              name={bookmark.name}
              component={() => (
                <>
                  <WebViewComponent url={bookmark?.interactiveObject?.url} text={`${bookmark?.text?.en}`} />
                  <CustomCompontent text={`${bookmark?.text?.en}`} narrationText={`${bookmark?.narrationText?.ar}`} />
                  <TouchableOpacity>
                    <Voice narrationText={`${bookmark?.narrationText?.en}`}/>
                  </TouchableOpacity>
                </>
              )}
            />
          ))
        ) : (
          <Drawer.Screen name="null"  
          component={() => 
            <Text>There are no bookmarks yet.</Text>
          }/>        
        )}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Bookmarks;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    toolbar: {
      backgroundColor: '#9c27b096',
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderBottomWidth: 1,
      borderBottomColor: '#E0E0E0',
      width:400   
    },
    music:{
      position:"absolute",
      bottom:20, 
      right:90
    }
  });
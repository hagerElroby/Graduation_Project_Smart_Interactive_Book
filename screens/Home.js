import React, { useState ,useEffect } from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Bookmarks from "./Bookmarks";
import ObjectLibrary from "./objectLibrary";
import Glossary from "./Glossary";
import Contents from "./Contents";
import CustomDrawer from "../components/CustomDrawer";
import BookCover from './BookCover'
import AsyncStorage from '@react-native-async-storage/async-storage';
const Drawer = createDrawerNavigator();
const Home = () => {

  
  const [bookmarks, setBookmarks] = useState([]);
  // function to add bookmark
  const addBookmark = (bookmark) => {
    if (!bookmarks.some((b) => b.name === bookmark.name)) {
    setBookmarks([...bookmarks, bookmark]);
    AsyncStorage.setItem('bookmarks', JSON.stringify([...bookmarks, bookmark]));
    }
  };
  
  const removeBookmark = (bookmark) => {
    const updatedBookmarks = bookmarks.filter((b) => b.name !== bookmark.name);
    setBookmarks(updatedBookmarks);
    AsyncStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
  };
  
  // function to get bookmarks from local storage
  const getBookmarks = () => {
    AsyncStorage.getItem('bookmarks').then((result) => {
      if (result) {
        setBookmarks(JSON.parse(result));
      }
    });
  };
  useEffect(() => {
    getBookmarks();
  }, []);

  return (
    <NavigationContainer independent={true} >
      <Drawer.Navigator initialRouteName="BookCover" drawerContent={props => <CustomDrawer {...props} />}>
        <Drawer.Screen name="Biology" component={BookCover}  options={{drawerStyle:{ width:240}}} />
        <Drawer.Screen name="Contents" options={{headerShown:false }}>
            {() =><Contents addBookmark={addBookmark}  bookmarks={bookmarks} removeBookmark={removeBookmark}/>}
        </Drawer.Screen>
        <Drawer.Screen name="Glossary" component={Glossary}  options={{headerShown:false}}/>
        <Drawer.Screen name="Bookmarks" options={{headerShown:false}}>
            {() => <Bookmarks bookmarks={bookmarks} />}
        </Drawer.Screen>
        <Drawer.Screen name="ObjectLibrary" component={ObjectLibrary}  options={{headerShown:false}} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
export default  Home;




















  // const addBookmark = (bookmark) => {
  //   const bookmarkExists = bookmarks.some((b) => b.name === bookmark.name);
  //   if (bookmarkExists) {
  //     const updatedBookmarks = bookmarks.filter((b) => b.name !== bookmark.name);
  //     setBookmarks(updatedBookmarks);
  //     AsyncStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
  //   } else {
  //     setBookmarks([...bookmarks, bookmark]);
  //     AsyncStorage.setItem('bookmarks', JSON.stringify([...bookmarks, bookmark]));
  //   }
  // };
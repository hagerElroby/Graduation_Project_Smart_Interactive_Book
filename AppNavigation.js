import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Splash from './screens/Splash'
import Main from './screens/Main'
import Home from "./screens/Home";
 import { LogBox } from 'react-native'; 
// Ignore log notification by message
LogBox.ignoreLogs(['Warning: ...']);
//Ignore all log notifications
LogBox.ignoreAllLogs();
const Drawer = createDrawerNavigator();
const AppNavigation = ()=> {

  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Splash" component={Splash} options={{headerShown:false}} />
        <Drawer.Screen name="Main" component={Main} options={{headerShown:false}} />
        <Drawer.Screen name="Home" component={Home} options={{headerShown:false}} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
export default AppNavigation;
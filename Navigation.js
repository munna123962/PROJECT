
import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Signin from './myComponent/Signin2'
import Signup from './myComponent/Signup2'
import Forgotpassword from './myComponent/Forgotp2'
import Dashboard from './myComponent/Dashb2'
import Addprofile from './myComponent/Addprofile2'
import Choosepassword from './myComponent/Choosepassword'
import Sidemenu from './myComponent/Sidemenu'
import Resetpassword from './myComponent/Resetpassword'
import Loginscreen from './myComponent/Loginscreen'
import Viewprofile from './myComponent/Viewprofile2'
import Myedit from './myComponent/Myedit2'
import Business from './myComponent/Business'
import Friend from './myComponent/Friend'
import Myadd from './myComponent/Myadd'
import Searchdatabase from './myComponent/Searchdatabase'
import Account from './myComponent/Account'
import Newprofile from './myComponent/Newprofile'
import Editprofile from './myComponent/Editprofile'
import Mynoticeboard from './myComponent/Mynoticeboard'
import Noticeboard from './myComponent/Noticeboard'
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Drawerroute = () => {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}
      drawerContent={({ navigation }) => {
        return (
          <Sidemenu moveto={navigation} />
        )

      }}
      drawerType={'front'}
      drawerStyle={{
        width: 250, height: 600}}>
      
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="Business" component={Business} />
      <Drawer.Screen name="Friend" component={Friend} />
      <Drawer.Screen name="Viewprofile" component={Viewprofile} />
      <Drawer.Screen name="Resetpassword" component={Resetpassword} />
      <Drawer.Screen name="Myadd" component={Myadd} />
      <Drawer.Screen name="Addprofile" component={Addprofile} />
      <Drawer.Screen name="Myedit" component={Myedit} />
      <Drawer.Screen name="Searchdatabase" component={Searchdatabase} />
      <Drawer.Screen name="Account" component={Account} />
      <Drawer.Screen name="Mynoticeboard" component={Mynoticeboard} />
      <Drawer.Screen name="Noticeboard" component={Noticeboard} />
    </Drawer.Navigator>
  );
};

const Stackroute = () => {
  return (


    <Stack.Navigator screenOptions={{ headerShown: false, }}>
      <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="Forgotpassword" component={Forgotpassword} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Choosepassword" component={Choosepassword} />

    </Stack.Navigator>
  )
}




const Allroutes = () => {
  return (
    <NavigationContainer>

      <Stack.Navigator screenOptions={{ headerShown: false, }}>
        <Stack.Screen name="Stackroute" component={Stackroute} />
        <Stack.Screen name="Drawerroute" component={Drawerroute} />

      </Stack.Navigator>



    </NavigationContainer>



  );

};

export default Allroutes


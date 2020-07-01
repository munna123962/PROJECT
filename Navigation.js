
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
import Addmember from './myComponent/Addmember2'
import Viewprofile from './myComponent/Viewprofile2'
import Myedit from './myComponent/Myedit2'




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
        width: 250, height: 500}}>
      
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="Viewprofile" component={Viewprofile} />
      <Drawer.Screen name="Resetpassword" component={Resetpassword} />
      <Drawer.Screen name="Addmember" component={Addmember} />
      <Drawer.Screen name="Addprofile" component={Addprofile} />

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


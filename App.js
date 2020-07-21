import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import Signin from './myComponent/Signin2'
import Signup from './myComponent/Signup2'
import Forgotpassword from './myComponent/Forgotp2'
import Dashboard from './myComponent/Dashb2'
import Addprofile from './myComponent/Addprofile2'
import Sidemenu from './myComponent/Sidemenu'
import Allroutes from './Navigation'
import Choosepassword from './myComponent/Choosepassword'
import Resetpassword from './myComponent/Resetpassword'
import Loginscreen from './myComponent/Loginscreen'
import Dimension from './myComponent/Dimension'
import Addmember from './myComponent/Addmember2'
import Viewprofile from './myComponent/Viewprofile2'
import Dummy from './myComponent/Dummy'
import Loading from './myComponent/Loading'
import Myedit from './myComponent/Myedit2'
import Phone from './myComponent/Phone'
import Business from './myComponent/Business'
import Friend from './myComponent/Friend'
import Contactlist from './myComponent/Contactlist'
import DocuPicker from './myComponent/DocumentPicker'
import Account from './myComponent/Account'
import Profileview from './myComponent/Profileview'
import Profileviewedit from './myComponent/Profileviewedit'
import Scanner from './myComponent/Scanner'
import Noticeboard from './myComponent/Noticeboard'
export default class App extends Component {
    constructor() {
        super();
        this.state = {
            
        };
    }
    

    render() {
        return (
            <View style={styles.container}>
                <Allroutes>

   </Allroutes>
               


            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: { flex: 1 }

}

)
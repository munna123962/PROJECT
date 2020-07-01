import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import firebaseApp from '../firebaseConfig';

export default class Sidemenu extends Component {
    constructor() {
        super();
        this.state = {

        }
    }
    tab = ({ icon, text, onclick }) => {
        return (
            <TouchableOpacity style={{ width: 250, height: 70, flexDirection: 'row' }} onPress={() => onclick()}>
                <View style={{ flex: 0.15, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderBottomWidth: 2, borderColor: 'gray' }}>
                    <View style={{ width: 35, height: 35 }}>
                        <Image resizeMode={'contain'} style={{ flex: 1, height: undefined, width: undefined }} source={icon}>

                        </Image>
                    </View>

                </View>
                <View style={{ flex: 0.85, justifyContent: 'center', backgroundColor: 'white', borderTopWidth: 1, borderBottomWidth: 1, borderColor: 'gray', marginLeft: 10 }}>
                    <Text style={{ fontSize: 18, color: 'black' }}>{text}</Text>

                </View>

            </TouchableOpacity>
        )
    }
    signoutuser = () => {
        firebaseApp.auth().signOut()
            .then((response) => {
                console.log('Signout successful')
                Alert.alert('Signout Successful')
                this.props.moveto.navigate('Signin')
                


            })
            .catch((error) => {
                Alert.alert(error.message)
                console.log('failure',error.message)


           })

    }
    deleteaccount=()=>{
    
        firebaseApp.auth().currentUser.delete()
            .then((response) => {
                console.log('Deleted successful')
                Alert.alert('Deleted Successful')
                this.props.moveto.navigate('Signup')


            })
            .catch((error) => {
                Alert.alert(error.message)
                console.log('failure',error.message)


           })

    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ width: 250, height: 90, backgroundColor: 'purple', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 25, color: 'Black' }}>Business Cards</Text>

                </View>
                <this.tab icon={require('../images/test.png')} text={'Home'} onclick={() => { this.props.moveto.navigate('Dashboard') }} />
                <this.tab icon={require('../images/selection.png')} text={'Viewprofile'} onclick={() => { this.props.moveto.navigate('Viewprofile') }} />
                <this.tab icon={require('../images/contact.png')} text={'Reset Password'} onclick={() => { this.props.moveto.navigate('Resetpassword') }} />
                <this.tab icon={require('../images/contact.png')} text={'Signout'} onclick={() => this.signoutuser()} />
                <this.tab icon={require('../images/contact.png')} text={'Delete Account'} onclick={() => this.deleteaccount()} />
                
            </View>
        )
    }
}
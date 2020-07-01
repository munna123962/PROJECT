import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity, Alert, ScrollView, Dimensions, _ScrollView } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import firebaseApp from '../firebaseConfig'

export default class Signin extends Component {
    constructor() {
        super();
        this.state = {
            em: '', pass: '', checkbox: false
        };
    }
    input = ({ name, place, ontext, isPassword }) => {
        return (
            <View style={{ flex: 1 }}>

                <View style={{ flex: 0.35 }}>
                    <Text style={{ fontSize: 20, color: 'black' }}>{name}
                    </Text>


                </View>
                <View style={{ flex: 0.65 }}>
                    <TextInput secureTextEntry={isPassword} style={{ borderColor: '#E8EBF0', borderWidth: 2, borderRadius: 5 }} placeholder={place} onChangeText={(text) => ontext(text)}>

                    </TextInput>

                </View>
            </View>

        )
    }
    onsigninpress = () => {
        if (this.state.em.length > 5 && this.state.pass.length > 5) {
            firebaseApp.auth().signInWithEmailAndPassword(this.state.em, this.state.pass)
                .then((response) => {
                    /*we can writefirebaseApp.auth().currentUser as response.user*/

                    if (firebaseApp.auth().currentUser.emailVerified) {

                        this.props.navigation.navigate('Drawerroute')
                    }
                    else {
                        firebaseApp.auth().currentUser.sendEmailVerification()
                            .then(() => {
                                Alert.alert('Verification email is delivred to your mail box, please verify it by clicking the link')
                                firebaseApp.auth().signOut();
                            }).catch((error) => {
                                console.log('----error ', error.message)
                                Alert.alert('error code: 101 Please contact at support@eschoooz.com ')
                                firebaseApp.auth().signOut()
                            })
                    }
                    /*{
                     Alert.alert('Signin Successfully')
                     console.log('success')
                     
                     this.props.navigation.navigate('Drawerroute')*/

                })

                .catch((error) => {
                    Alert.alert(error.message)
                    console.log('failure', error.message)


                })




        }
        else {
            let message = ''
            if (this.state.em.length < 5) message = 'Invalid email adress';
            if (this.state.pass.length < 5) message = 'Invalid password;'
            Alert.alert(message)
        }
    }
    forgotpassword = () => {
        if (this.state.em.length > 5) {
            firebaseApp.auth().sendPasswordResetEmail(this.state.em)
                .then((response) => {
                    Alert.alert('Please check email click on link')
                    console.log('Please check email')
                })
                .catch((error) => {
                    Alert.alert(error.message)
                    console.log('fail to send', error.message)
                })
        } else {
            Alert.alert('please enter valid email id')
        }
    }
    getScreenMaxHeight = () => {
        const h = Dimensions.get('window').height;
        const w = Dimensions.get('window').width;
        if (h > w) return h;
        else return w
    }
    convertFlexToFixed = (flexValue) => {
        const screenHeight = this.getScreenMaxHeight();
        const fixed = screenHeight * flexValue;// 700*0.2 = 140
        return fixed;
    }


render() {
    return (
        <ScrollView>


        <View style={{ width: '100%', height: this.convertFlexToFixed(1) }}>
            <View style={styles.headcontainer}>
                <Text style={{ fontSize: 30, color: 'black' }}>SignIn
                        </Text>

            </View>
            <View style={styles.ips}>
                <View style={styles.internalips}>

                    <View style={{ flex: 0.25 }}>
                        <this.input name={'Email'} place={'Enter Email here'} ontext={(text) => { this.setState({ em: text }) }} />
                    </View>
                    <View style={{ flex: 0.25 }}>

                        <this.input isPassword={true} name={'Password'} place={'Enter password here'} ontext={(text) => { this.setState({ pass: text }) }} />
                    </View>
                    <View style={styles.forrem}>
                        <View style={{ flex: 0.1 }}>
                            <CheckBox value={this.state.checkbox}
                                onValueChange={(text) => { this.setState({ checkbox: text }) }}>

                            </CheckBox>

                        </View>
                        <View style={{ flex: 0.45 }}>
                            <Text style={{ fontSize: 16, color: 'black', marginTop: 2 }}>Rememberme
                        </Text>


                        </View>
                        <TouchableOpacity style={{ flex: 0.45 }} onPress={() => { this.forgotpassword() }}>
                            <Text style={{ fontSize: 16, color: 'black', marginTop: 2 }}>Forgot Password
                                </Text>

                        </TouchableOpacity>

                    </View>
                    <View style={{flex:0.15}}>
                    <TouchableOpacity style={styles.loginbutton} onPress={() => this.onsigninpress()}>
                        <Text style={{ fontSize: 20, color: 'black' }}>Login</Text>
                    </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity style={{ flex: 0.25, alignItems: 'center' }} onPress={() => { this.props.navigation.navigate('Signup') }}>
                    <Text style={{ fontSize: 16, color: 'black' }}>Clickhere For New Account
                                </Text>
                </TouchableOpacity>
            </View>

            </View>
            </ScrollView>



        )
    }
}
const styles = StyleSheet.create({
                container: { flex: 1, backgroundColor: 'white' },

    headcontainer: { flex: 0.25, backgroundColor: '#9746ab', justifyContent: 'center', alignItems: 'center', borderBottomColor: 'gray', borderBottomWidth: 2 },
    ips: { flex: 0.75 },
    internalips: { flex: 1, margin: 20 },
    forrem: { flex: 0.15, flexDirection: 'row' },
    loginbutton: { flex: 1, backgroundColor: '#9651b5', justifyContent: 'center', alignItems: 'center', marginTop:10,marginBottom:10, borderRadius: 10 }

}

)
import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import firebaseApp from '../firebaseConfig';


export default class Forgotpassword extends Component {
    constructor() {
        super();
        this.state = {
            email: ''
        };
    }
    input = ({ name, place, ontext }) => {
        return (
            <View style={{ flex: 1 }}>

                <View style={{ flex: 0.35 }}>
                    <Text style={{ fontSize: 20, color: 'black' }}>{name}
                    </Text>


                </View>
                <View style={{ flex: 0.65 }}>
                    <TextInput style={{ borderColor: '#E8EBF0', borderWidth: 2, borderRadius: 5 }} placeholder={place} onChangeText={(text) =>{ this.ontext(text)}}>

                    </TextInput>

                </View>
            </View>

        )
    }

    forgotpassword=()=>{
        if(this.state.email.length>5){
            firebaseApp.auth().sendPasswordResetEmail(this.state.email)
            .then((response)=>{
                Alert.alert('Please check email click on link')
                console.log('Please check email')
            })
            .catch((error)=>{
                Alert.alert(error.message)
                console.log('fail to send',error.message)
            })
        }else{
            Alert.alert('please enter valid email id')
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headcontainer}>
                    <Text style={{ fontSize: 30, color: 'black' }}>Forgot Password?
                        </Text>

                </View>
                <View style={styles.ips}>
                    <View style={styles.internalips}>
<View style={{flex:0.15}}>

</View>
                        <View style={{ flex: 0.25,justifyContent:'center' }}>
                            <this.input name={'Email'} place={'Enter Email here'} ontext={(text) => { this.setState({ email: text }) }} />
                        </View>
                        
                        
                            <TouchableOpacity style={styles.sendlink} onPress={()=>this.forgotpassword()}>
                                <Text style={{ fontSize: 16, color: 'black', marginTop: 2 }}>Forgot Password
                                </Text>

                            </TouchableOpacity>
                            <TouchableOpacity style={{flex:0.1,justifyContent:'center',alignItems:'center'}} onPress={()=>{this.props.navigation.navigate('Signin')}}>
                                <Text style={{ fontSize: 16, color: 'black' }}>Backto Signin
                                </Text>
                                </TouchableOpacity>

                          
                        
                        
                    </View>

                </View>



            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white' },

    headcontainer: { flex: 0.25, backgroundColor: '#9746ab', justifyContent: 'center', alignItems: 'center', borderBottomColor: 'gray', borderBottomWidth: 2 },
    ips: { flex: 0.75 },
    internalips: { flex: 1, margin: 20 },
    
    sendlink: { flex: 0.15, backgroundColor: '#9651b5', justifyContent: 'center', alignItems: 'center', margin: 20, borderRadius: 10 }

}

)
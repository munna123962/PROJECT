import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity, Alert, Dimensions ,ScrollView} from 'react-native';
import firebaseApp from '../firebaseConfig'



export default class Signup extends Component {
    constructor() {
        super();
        this.state = {
            email: '', password: '', name: '', confirmpassword: ''
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
                    <TextInput style={{ borderColor: '#E8EBF0', borderWidth: 2, borderRadius: 5 }} placeholder={place} onChangeText={(text) => ontext(text)}>

                    </TextInput>

                </View>
            </View>

        )
    }

    onSignupPress = () => {
        if (this.state.name.length > 2 && this.state.email.length > 5 && this.state.password.length > 5 && this.state.password == this.state.confirmpassword) {
            firebaseApp.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then((response) => {
                    Alert.alert('Your account is created sucessfully')
                    console.log('-------------------success')
                    response.user.displayName
                     this.props.navigation.navigate('Signin')
                    
                })
                .catch((error) => {
                    Alert.alert(error.message)
                    console.log('------failed', error.message)
                })
        }
        else {
            let message = 'Invalid fields '
            if (this.state.name.length < 3) message = message + 'name';
            if (this.state.email.length < 6) message = message + ' email ';

            if (this.state.password.length < 6) message = message + ' password ';
            if (this.state.confirmpassword != this.state.password) message = message + 'confirmpassword  ';

            Alert.alert(message)
        }
    }
    getScreenMaxHeight=()=>{
        const h=Dimensions.get('window').height
        const w=Dimensions.get('window').width
        if(h>w){
            return h
        }else{
            return w
        }
    }
    ConvertFlexToFixed=(flexvalue)=>{
        const screenHeight=this.getScreenMaxHeight();
        const fixed=screenHeight*flexvalue
        return fixed

    }

    render() {
        return (
            <ScrollView>
            <View style={{width:'100%',height:this.ConvertFlexToFixed(1)}}>
                <View style={styles.headcontainer}>
                    <Text style={{ fontSize: 30, color: 'black' }}>SignUp
                        </Text>

                </View>
                <View style={styles.ips}>
                    <View style={styles.internalips}>
                        <View style={{ flex: 0.2 }}>
                            <this.input name={'Name'} place={'Enter Name here'} ontext={(text) => { this.setState({ name: text }) }} />
                        </View>

                        <View style={{ flex: 0.2 }}>
                            <this.input name={'Email'} place={'Enter Email here'} ontext={(text) => { this.setState({ email: text }) }} />
                        </View>
                        <View style={{ flex: 0.2 }}>

                            <this.input name={'Password'} place={'Enter Password here'} ontext={(text) => { this.setState({ password: text }) }} />
                        </View>
                        <View style={{ flex: 0.2 }}>

                            <this.input name={'Confirm Password'} place={'Enter Confirm password here'} ontext={(text) => { this.setState({ confirmpassword: text }) }} />
                        </View>

                        <View style={{flex:0.15}}>

                        <TouchableOpacity onPress={() => this.onSignupPress()} style={styles.signupbutton}>
                            <Text style={{ fontSize: 20, color: 'black' }}>SignUp</Text>
                        </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={styles.clickforlogin} onPress={() => { this.props.navigation.navigate('Signin') }}>
                            <Text style={{ fontSize: 15, color: 'black' }}>Already have an Account Signin</Text>
                        </TouchableOpacity>

                    </View>

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

    signupbutton: { flex: 1, backgroundColor: '#9651b5', justifyContent: 'center', alignItems: 'center', marginTop:10,marginBottom:10, borderRadius: 10 },
    clickforlogin: { flex: 0.05, alignItems: 'center' }

}

)
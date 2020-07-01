import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity, Alert,Dimensions,ScrollView } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const { height }=Dimensions.get('window')

export default class Loginscreen extends Component {
    constructor() {
        super();
        this.state = {
            em: '', pass: '', checkbox: false,screenHeight:0,
        };
    }
    onContentSizeChange=(contentWidth,contentHeight)=>{

        this.setState({
            screenHeight:contentHeight
        })
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

    render() {
        return (

            <View style={styles.container}>
                <View style={styles.headcontainer}>
                    <Text style={{ fontSize: 30, color: 'black' }}>SignIn
                        </Text>

                </View>
                <View style={styles.ips}>
                    <View style={styles.internalips}>
                        

                        <View style={{ flex: 0.25, backgroundColor: 'orange' }}>
                            <this.input name={'Email'} place={'Enter Email here'} ontext={(text) => { this.setState({ em: text }) }} />
                        </View>
                        <View style={{ flex: 0.25, backgroundColor: 'skyblue' }}>

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
                        <View style={{flex:0.15,backgroundColor:'green',justifyContent:'center'}}>


                        <TouchableOpacity style={styles.loginbutton} onPress={() => this.onsigninpress()}>
                            <Text style={{ fontSize: 20, color: 'black' }}>Login</Text>
                        </TouchableOpacity>
                        </View>
                    
                    <TouchableOpacity style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center', backgroundColor: 'orange' }} onPress={() => { this.props.navigation.navigate('Signup') }}>
                        <Text style={{ fontSize: 16, color: 'black' }}>Clickhere For New Account
                                </Text>
                    </TouchableOpacity>
                    
                    
                    </View>

                </View>



            </View>




        )
    }
}
const styles = StyleSheet.create({
    container: { flex:1, backgroundColor: 'white' },

    headcontainer: { flex:0.2, backgroundColor: '#9746ab', justifyContent: 'center', alignItems: 'center', borderBottomColor: 'gray', borderBottomWidth: 2 },
    ips: {flex:0.8, },
    internalips: { flex: 1,margin:20,backgroundColor:'gray' },
    forrem: { flex: 0.15, flexDirection: 'row', backgroundColor: 'yellow' },
    loginbutton: { flex: 1, backgroundColor: '#9651b5', justifyContent: 'center', alignItems: 'center', borderRadius: 10,margin:10 }

}

)
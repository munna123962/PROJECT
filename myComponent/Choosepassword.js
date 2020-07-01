import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
export default class Choosepassword extends Component {
    constructor() {
        super();
        this.state = {
            newpassword: '', rnewpassword: ''
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
   

    render() {
        return (

            <View style={styles.container}>
                <View style={styles.headcontainer}>
                    <Text style={{ fontSize: 30, color: 'black' }}>Choose Password
                        </Text>

                </View>
                <View style={styles.ips}>
                    <View style={styles.internalips}>

                        <View style={{ flex: 0.25 }}>
                            <this.input isPassword={true} name={'New Password'} place={'Enter New Password here'} ontext={(text) => { this.setState({ newpassword: text }) }} />
                        </View>
                        <View style={{ flex: 0.25 }}>

                            <this.input isPassword={true} name={'Retype NewPassword'} place={'Enter Retype NewPassword  here'} ontext={(text) => { this.setState({ rnewpassword: text }) }} />
                        </View>
                        
                        <TouchableOpacity style={styles.submitbutton} onPress={() => this.oncpsubmitpress()}>
                            <Text style={{ fontSize: 20, color: 'black' }}>Submit</Text>
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
    forrem: { flex: 0.15 },
    submitbutton: { flex: 0.15, backgroundColor: '#9651b5', justifyContent: 'center', alignItems: 'center', margin: 20, borderRadius: 10 }

}

)
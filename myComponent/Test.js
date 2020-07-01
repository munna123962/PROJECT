import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, Image,TouchableOpacity } from 'react-native';

export default class Test extends Component {
    constructor() {
        super();
        this.state = {

        }
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'red' }}>
                <View style={{ flex: 0.1, backgroundColor: 'green', flexDirection: 'row' }}>
                    <View style={{ flex: 0.15, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center' }} >
                        <TouchableOpacity style={{ width: 30, height: 30 }} onPress={() => this.props.navigation.goBack()}>
                            <Image resizeMode={'contain'} source={require('../images/back.png')} style={{ width: undefined, height: undefined, flex: 1 }}>

                            </Image>
                        </TouchableOpacity>

                    </View>
                </View>

                <View style={{ flex: 0.9, backgroundColor: 'skyblue', justifyContent: 'center' }}>
                    <View style={{ flex: 0.1, backgroundColor: 'purple', margin: 30, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                       
                      <TouchableOpacity onPress={()=>this.props.navigation.navigate('Selection')}>
                       
                        <Text style={{ fontSize: 20, color: 'white' }}>Clickme
                        </Text>
                        </TouchableOpacity>
                        

                    </View>


                </View>


            </View>




          
        )
    }

    

}
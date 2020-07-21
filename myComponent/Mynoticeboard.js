import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity, Alert, Dimensions, ScrollView, } from 'react-native';
import firebaseApp from '../firebaseConfig'
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from "rn-fetch-blob";
export default class Mynoticeboard extends Component{
    constructor(){
        super();
        this.state={

        }
    }
    getScreenMaxHeight = () => {
        const h = Dimensions.get('window').height
        const w = Dimensions.get('window').width
        if (h > w) {
            return h
        } else {
            return w
        }
    }
    convertFlexToFixed = (flexValue) => {
        const screenHeight = this.getScreenMaxHeight()
        const fixed = screenHeight * flexValue
        return fixed
    }
    render(){
        return(
            <View style={{flex:1,backgroundColor:'orange'}}>
                 <View style={{ width: '100%', height: this.convertFlexToFixed(0.1), flexDirection: 'row' }}>
                    <View style={{ flex: 0.15, backgroundColor: 'rgba(128,0,128,0.8)', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: this.convertFlexToFixed(0.05), height: this.convertFlexToFixed(0.05) }}>
                            <Image source={require('../images/menu.png')} style={{ flex: 1, width: undefined, height: undefined }} resizeMode={'cover'}>

                            </Image>
                        </View>

                    </View>
                    <View style={{ flex: 0.7, backgroundColor: 'rgba(128,0,128,0.8)', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: this.convertFlexToFixed(0.03), color: 'white' }}>
                            My Posts
                       </Text>

                    </View>
                    <View style={{ flex: 0.15, backgroundColor: 'rgba(128,0,128,0.8)', justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Noticeboard')}} style={{ width: this.convertFlexToFixed(0.05), height: this.convertFlexToFixed(0.05),borderRadius:this.convertFlexToFixed(0.05/2),overflow:'hidden' }}>
                            <Image source={require('../images/addpost.jpg')} style={{ flex: 1, width: undefined, height: undefined }} resizeMode={'cover'}>

                            </Image>
                        </TouchableOpacity>

                    </View>
                </View>


            </View>
        )
    }
}
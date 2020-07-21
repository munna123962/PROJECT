import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity, Alert, Dimensions, ScrollView, } from 'react-native';
import firebaseApp from '../firebaseConfig'
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from "rn-fetch-blob";
export default class Noticeboard extends Component {
    constructor() {
        super();
        this.state = {
            note: '', imageURL: '',
            orientationChanged: false,name:'',dp:''

        }
    }
    componentDidMount() {
        this.subscribeDimensions()

    }
    UNSAFE_componentWillMount() {
        // console.log('enter bfm')
         this.focus = this.props.navigation.addListener('focus', () => {
 
 this. getProfileInf()
         
 
             //console.log('entered bfm')
 });
 
 
     }
     componentWillUnmount() {
         this.props.navigation.removeListener(this.focus)
     }
    getProfileInf = () => {
        const id = firebaseApp.auth().currentUser.uid
        const path = 'ProfileUsers/ListOfProfileUsers/Public/' + id + '/Userdetails/'


        //firebaseApp.database().ref(path).once('value')
        firebaseApp.database().ref(path).on('value', (res) => {

            // .then((res) => {
            var data = JSON.parse(JSON.stringify(res))
            // console.log(data)
            const id = firebaseApp.auth().currentUser.uid
            console.log('======================================check', data)
            if (data == null) {
                this.getProfileInfprivate()
            } else {
                this.setState({
                    id: id,
                    name: data && data.Name ? data.Name : '',
                   
                    dp: data && data.dp ? data.dp : ''

                })
            }
            
        })
        /*.catch((error) => {
     console.log('error', error.message)
        })*/
    }
    getProfileInfprivate = () => {
        const id = firebaseApp.auth().currentUser.uid
        const path = 'ProfileUsers/ListOfProfileUsers/Private/' + id + '/Userdetails/'


        //firebaseApp.database().ref(path).once('value')
        firebaseApp.database().ref(path).on('value', (res) => {

            // .then((res) => {
            var data = JSON.parse(JSON.stringify(res))
            // console.log(data)
            const id = firebaseApp.auth().currentUser.uid
            console.log('======================================check', data)
            this.setState({
                id: id,
                name: data && data.Name ? data.Name : '',
                dp: data && data.dp ? data.dp : ''

            })
            path2 = 'ProfileUsers/ListOfProfileUsers/Public/' + id + '/Userdetails/'
            firebaseApp.database().ref(path2).off
          
        })
        /*.catch((error) => {
            console.log('error', error.message)
               })*/
    }
    onSubmitPress = () => {

    }
    uploadImage = () => {
        const options = {
            title: 'Select Avatar',
            customButtons: [],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response.path, response.uri);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    imageURL: response.uri
                });
            }
        });
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
    getScreenWidth = () => {
        const w = Dimensions.get('window').width
        return w
    }

    ConvertFlexToWidth = (flex) => {
        const screenWidth = this.getScreenWidth();
        const fixed = screenWidth * flex
        return fixed

    }
    subscribeDimensions = () => {
        Dimensions.addEventListener('change', () => {
            this.setState({ orientationChanged: !this.state.orientationChanged })
        })
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ width: '100%', height: this.convertFlexToFixed(0.1), flexDirection: 'row' }}>
                    <View style={{ flex: 0.15, backgroundColor: 'rgba(128,0,128,0.8)', justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => { this.props.navigation.goBack() }} style={{ width: this.convertFlexToFixed(0.05), height: this.convertFlexToFixed(0.05) }}>
                            <Image source={require('../images/back.png')} style={{ flex: 1, width: undefined, height: undefined }} resizeMode={'cover'}>

                            </Image>
                        </TouchableOpacity>

                    </View>
                    <View style={{ flex: 0.7, backgroundColor: 'rgba(128,0,128,0.8)', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: this.convertFlexToFixed(0.03), color: 'white' }}>
                            {this.state.name}
                       </Text>

                    </View>
                    <View style={{ flex: 0.15, backgroundColor: 'rgba(128,0,128,0.8)', justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => { this.uploadImage() }} style={{ width: this.convertFlexToFixed(0.05), height: this.convertFlexToFixed(0.05) }}>
                            <Image source={require('../images/attach.png')} style={{ flex: 1, width: undefined, height: undefined }} resizeMode={'cover'}>

                            </Image>
                        </TouchableOpacity>
                    </View>

                </View>
                <ScrollView contentContainerStyle={{ width: '100%', height: this.convertFlexToFixed(0.9) }}>
                    <View style={{ width: this.ConvertFlexToWidth(1), height: this.convertFlexToFixed(0.1), backgroundColor: '#E7D0FB', justifyContent: 'center' }}>
                        <Text style={{ fontSize: this.convertFlexToFixed(0.02), color: 'black' }}>
                            Write Short Note........
                       </Text>
                    </View>
                    <View style={{ width: '100%', height: this.convertFlexToFixed(0.1), backgroundColor: 'white', justifyContent: 'center', borderWidth: this.convertFlexToFixed(0.002), borderColor: '#F1F3F4' }}>
                        <TextInput style={{ backgroundColor: '#E7D0FB' }} value={this.state.note} onChangeText={(text) => { this.setState({ note: text }) }} placeholder={'Type here'}>

                        </TextInput>
                    </View>
                    <View style={{ width: '100%', height: this.convertFlexToFixed(0.6), backgroundColor: '#E7D0FB' }}>

                        <View style={{ width: this.ConvertFlexToWidth(1), height: this.convertFlexToFixed(0.6) }}>
                            <Image source={{ uri: this.state.imageURL }} style={{ flex: 1, width: undefined, height: undefined }} resizeMode={'stretch'}>

                            </Image>
                        </View>

                    </View>
                    <View style={{ width: '100%', height: this.convertFlexToFixed(0.1), backgroundColor: '#E7D0FB' }}>

                        <TouchableOpacity onPress={() => { this.onSubmitPress() }} style={{ flex: 1, backgroundColor: 'rgba(128,0,128,0.8)', margin: this.convertFlexToFixed(0.02), justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: this.convertFlexToFixed(0.03), color: 'white' }}>
                                Submit
                            </Text>
                        </TouchableOpacity>

                    </View>


                </ScrollView>
            </View>
        )
    }
}
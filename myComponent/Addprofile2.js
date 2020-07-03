import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity, Alert, Dimensions, ScrollView, } from 'react-native';
import firebaseApp from '../firebaseConfig'
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from "rn-fetch-blob";
import { Picker } from '@react-native-community/picker';

export default class Addprofile extends Component {
    constructor() {
        super();
        this.state = {
            name: '', job: '', cname: '', number: '', isEdit: false, id: '', imageURL: '', privacy: 'Public'
        };
    }
    input = ({ name, place, ontext, value, keyentry }) => {
        return (
            <View style={{ flex: 1 }}>

                <View style={{ flex: 0.35 }}>
                    <Text style={{ fontSize: this.ConvertFlexToFixed(0.025), color: 'black' }}>{name}
                    </Text>


                </View>
                <View style={{ flex: 0.65 }}>
                    <TextInput style={{ borderColor: '#E8EBF0', borderWidth: this.ConvertFlexToFixed(0.002), borderRadius: this.ConvertFlexToFixed(0.005) }} placeholder={place} value={value}
                        onChangeText={(text) => ontext(text)} keyboardType={keyentry}>

                    </TextInput>

                </View>
            </View>

        )
    }
    UNSAFE_componentWillMount() {
        this.focus = this.props.navigation.addListener('focus', () => {
            this.loadDefaultValuesOnScreenOn()
        });


    }
    componentWillUnmount() {
        this.props.navigation.removeListener(this.focus)
    }
    loadDefaultValuesOnScreenOn = () => {
        const existingdata = this.props.route.params.data
        console.log('data', existingdata)
        if (existingdata != null) {
            this.setState({
                name: existingdata.name, job: existingdata.job,
                cname: existingdata.cname, number: existingdata.number,
                isEdit: true, id: existingdata.id, imageURL: existingdata.dp,
                privacy: existingdata.privacy



            })

        } else {
            this.setState({
                id: '', name: '', job: '', cname: '', number: '',
                isEdit: false, imageURL: '', privacy: ''
            })
        }
    }



    onSavePress = () => {
        if (this.state.name.length > 2) {


            const id = firebaseApp.auth().currentUser.uid
            let path2 = ''
            let path1 = ''
            if (!this.state.privacy.includes('Private')) {

                path2 = 'ProfileUsers/ListOfProfileUsers/Public/' + id + '/images/'
                path1 = 'ProfileUsers/ListOfProfileUsers/Public/' + id + '/Userdetails/'
            } else {
                path2 = 'ProfileUsers/ListOfProfileUsers/Private/' + id + '/images/'
                path1 = 'ProfileUsers/ListOfProfileUsers/Private/' + id + '/Userdetails/'
            }
            const data = {
                Name: this.state.name,
                Job: this.state.job,
                CompanyName: this.state.cname,
                ContactNumber: this.state.number,

                privacy: this.state.privacy
            }

            firebaseApp.database().ref(path1).update(data)
                .then((res) => {
                   


                    if (this.state.imageURL.length > 2) {
                        const id = this.state.imageURL
                        if (!id.includes('firebasestorage')) {
                            this.sendImageToFb(path2, path1)
                        } else {
                            Alert.alert('Saved Successfully without change dp')
                            this.props.navigation.navigate('Viewprofile')
                        }

                    } else {
                        Alert.alert('Saved Successfully without image')
                        this.props.navigation.navigate('Viewprofile')

                    }

                })
                // console.log('Saved Successfully')
                //this.props.navigation.navigate('Viewprofile')
                .catch((error) => {

                    Alert.alert('Failed')
                    console.log('Failed', error.message)
                    // console.log('Failed',error.message)
                })






        } else {
            Alert.alert('Invalid details')

        }

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
    sendImageToFb = (fbPath, userDetailsPath) => {
        const image = this.state.imageURL;
        const imageName = 'Avatar'
        const originalXMLHttpRequest = window.XMLHttpRequest;
        const originalBlob = window.Blob;
        const Blob = RNFetchBlob.polyfill.Blob;
        const fs = RNFetchBlob.fs;

        window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
        window.Blob = Blob;

        let uploadBlob = null;

        let uploadTask = firebaseApp
            .storage()
            .ref()
            .child(fbPath);
        const mime = "image/jpg";

        return fs
            .readFile(image, "base64")
            .then(data => {
                return Blob.build(data, { type: `${mime};BASE64` });
            })
            .then(blob => {
                uploadBlob = blob;
                return uploadTask.put(blob, {
                    contentType: mime,
                    customMetadata: {
                        name: imageName
                    }
                });
            })
            .then(() => {
                uploadBlob.close();
                window.XMLHttpRequest = originalXMLHttpRequest;
                window.Blob = originalBlob;

                return uploadTask.getDownloadURL();
            })
            .then(imgUrl => {
                // console.log('----downloadable url ',imgUrl)

                const urlData = { dp: imgUrl }
                return firebaseApp.database().ref(userDetailsPath).update(urlData);

            })
            .then((res) => {
                Alert.alert('Saved Successfully with image')
                this.props.navigation.navigate('Viewprofile')
                return res
            })
            .catch(error => {
                console.log(error)
                return error;
            });
    };
    getScreenMaxHeight = () => {
        const h = Dimensions.get('window').height
        const w = Dimensions.get('window').width
        if (h > w) {
            return h
        } else {
            return w
        }
    }
    ConvertFlexToFixed = (flexvalue) => {
        const screenHeight = this.getScreenMaxHeight();
        const fixed = screenHeight * flexvalue
        return fixed

    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ width: '100%', height: this.ConvertFlexToFixed(0.1) }}>
                    <View style={styles.headcontainer}>
                        <TouchableOpacity style={{ flex: 0.15, justifyContent: 'center', alignItems: 'center' }} onPress={() => { this.props.navigation.goBack() }}>
                            <View style={{ width: this.ConvertFlexToFixed(0.05), height: this.ConvertFlexToFixed(0.05) }}>
                                <Image source={require('../images/back.png')} style={{ flex: 1, width: undefined, height: undefined }} resizeMode={'contain'}>

                                </Image>

                            </View>



                        </TouchableOpacity>
                        <View style={{ flex: 0.70, justifyContent: 'center', marginLeft: 5 }}>
                            <Text style={{ fontSize: this.ConvertFlexToFixed(0.03), color: 'black' }}>
                                Edit Profile
                    </Text>
                        </View>



                    </View>
                </View>
                <ScrollView contentContainerStyle={{ width: '95%', height: this.ConvertFlexToFixed(1.15) }}>
                    <View style={{ width: '95%', height: this.ConvertFlexToFixed(1.1), margin: this.ConvertFlexToFixed(0.05) }}>
                        <View style={{ width: '95%', height: this.ConvertFlexToFixed(0.2) }}>

                            <this.input name={'Name'} place={'Enter Name here'} value={this.state.name} ontext={(text) => { this.setState({ name: text }) }} />
                        </View>

                        <View style={{ width: '95%', height: this.ConvertFlexToFixed(0.2) }}>
                            <this.input name={'Job Title'} place={'Enter Job Title here'} value={this.state.job} ontext={(text) => { this.setState({ job: text }) }} />
                        </View>
                        <View style={{ width: '95%', height: this.ConvertFlexToFixed(0.2) }}>

                            <this.input name={'CompanyName'} place={'Enter Company Name here'} value={this.state.cname} ontext={(text) => { this.setState({ cname: text }) }} />
                        </View>
                        <View style={{ width: '95%', height: this.ConvertFlexToFixed(0.2) }}>

                            <this.input name={'ContactNumber'} place={'Enter Contact Number here'} value={this.state.number} ontext={(text) => { this.setState({ number: text }) }} keyentry={'number-pad'} />
                        </View>

                        <View style={{ width: '95%', height: this.ConvertFlexToFixed(0.1), justifyContent: 'flex-start' }}>
                            <Picker style={{ borderColor: '#E8EBF0', borderWidth: 2, borderRadius: 5 }} selectedValue={this.state.privacy}
                                onValueChange={(text, itemIndex) => { this.setState({ privacy: text }) }}>
                                <Picker.Item label="Public" value="Public" />
                                <Picker.Item label="Private" value="Private" />
                            </Picker>
                        </View>
                        <View style={{ width: '95%', height: this.ConvertFlexToFixed(0.1) }}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ flex: 0.2, justifyContent: 'center' }}>
                                    <View style={{ width: 65, height: 50 }}>
                                        <Image source={{ uri: this.state.imageURL }} style={{ width: undefined, height: undefined, flex: 1 }}
                                            resizeMode={'cover'}>

                                        </Image>
                                    </View>

                                </View>
                                <View style={{ flex: 0.4, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 20, color: 'black' }}>Upload</Text>

                                </View>
                                <View style={{ flex: 0.4, justifyContent: 'center', alignContent: 'center' }}>
                                    <TouchableOpacity style={styles.choosefile} onPress={() => this.uploadImage()}>
                                        <Text style={{ fontSize: 20, color: 'black' }}>Choose File</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>
                        <View style={{ width: '95%', height: this.ConvertFlexToFixed(0.1) }}>




                            <TouchableOpacity onPress={() => { this.onSavePress() }} style={styles.savebutton}>
                                <Text style={{ fontSize: 20, color: 'black' }}>Save</Text>
                            </TouchableOpacity>

                        </View>

                    </View>

                </ScrollView>



            </View>


        )
    }
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white' },

    headcontainer: { flex: 1, backgroundColor: '#9746ab', flexDirection: 'row' },



    savebutton: { flex: 1, backgroundColor: '#9651b5', margin: 10, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
    uploadimage: { flex: 1, alignItems: 'center', flexDirection: 'row' },
    choosefile: { flex: 1, backgroundColor: '#9651b5', borderRadius: 5, justifyContent: 'center', marginTop: 10, marginBottom: 10, alignItems: 'center' },

}

)
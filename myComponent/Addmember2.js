import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity, Alert, Dimensions, ScrollView } from 'react-native';
import firebaseApp from '../firebaseConfig'
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from "rn-fetch-blob";
import { Picker } from '@react-native-community/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-datepicker'

export default class Addmember extends Component {
    constructor() {
        super();
        this.state = {
            name: '', job: '', cname: '', number: '', isEdit: false, id: '', imageUrl: '', group: 'Friend Zone', date: ''
        };
    }
    input = ({ name, place, ontext, value }) => {
        return (
            <View style={{ flex: 1 }}>

                <View style={{ flex: 0.35 }}>
                    <Text style={{ fontSize: 20, color: 'black' }}>{name}
                    </Text>


                </View>
                <View style={{ flex: 0.65 }}>
                    <TextInput value={value} style={{ borderColor: '#E8EBF0', borderWidth: 2, borderRadius: 5 }} placeholder={place} onChangeText={(text) => ontext(text)}>

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
    uploadImageFromDevice = () => {
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
                    imageUrl: response.uri
                });
            }
        });
    }

    uploadImageToFb = (fbPath, userDetailsPath) => {
        const image = this.state.imageUrl;
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
                console.log('----downloadable url ', imgUrl)

                const urlData = { dp: imgUrl }
                return firebaseApp.database().ref(userDetailsPath).update(urlData);

            })
            .then((res) => {
                Alert.alert('Saved Successfully')
                this.props.navigation.navigate('Dashboard')
                return res
            })
            .catch(error => {
                console.log(error)
                return error;
            });
    };

    loadDefaultValuesOnScreenOn = () => {
        const existingUserData = this.props.route.params.data
        console.log('----forwarded data', existingUserData)

        if (existingUserData != null)//if edit user this will execute
        {
            this.setState({
                name: existingUserData.name,
                job: existingUserData.job,
                cname: existingUserData.cname,
                number: existingUserData.number,
                id: existingUserData.id,
                isEdit: true,
                imageUrl: existingUserData.dp,
                group: existingUserData.group
            })
        }
        else {// if new user this will execute
            this.setState({
                name: '',
                job: '',
                cname: '',
                number: '',
                id: '',
                isEdit: false,
                imageUrl: '',
                group: ''
            })
        }
    }
    onSavePress = () => {
        if (this.state.name.length > 2) {
            let memid = ''
            if (!this.state.isEdit) {
                memid = firebaseApp.database().ref().push().key
            }
            else {
                memid = this.state.id
            }

            const id = firebaseApp.auth().currentUser.uid
        
            let path=''
            let path2=''

            if (!this.state.group.includes('Friend')) {

                 path = 'Users/ListOfUsers/' + id + '/Businesszone/ListOfMembers/' + memid + '/MemDetails'
                 path2 = 'Users/ListOfUsers/' + id + '/Businesszone/ListOfMembers/' + memid + '/images/'
            } else {
                 path = 'Users/ListOfUsers/' + id + '/Friendzone/ListOfMembers/' + memid + '/MemDetails'
                 path2 = 'Users/ListOfUsers/' + id + '/Friendzone/ListOfMembers/' + memid + '/images/'

            }
            const data = {
                Name: this.state.name,
                Job: this.state.job,
                CompanyName: this.state.cname,
                ContactNumber: this.state.number,
                group: this.state.group
            }
            const existingUserData = this.props.route.params.data;
            firebaseApp.database().ref(path).update(data)
                .then((res) => {
                    //Alert.alert('Saved Successfully')
                    // console.log('database Saved Successfully')
                    // this.props.navigation.navigate('Dashboard')
                    if (this.state.imageUrl.length > 5) {
                        console.log('==========')
                        const dp = this.state.imageUrl;
                        if (!dp.includes('firebasestorage') || existingUserData.group != data.group  ) {
                            this.uploadImageToFb(path2, path)
                        }
                        else {
                            
                            if(existingUserData.group != data.group )
                            {
                                const path3 = 'Users/ListOfUsers/' + id +'/'+existingUserData.group+ '/ListOfMembers/' + memid
                                firebaseApp.database().ref(path3).remove().then(()=>{
                                    Alert.alert('Saved Successfully')
                                    this.props.navigation.navigate('Dashboard')
                                }).catch(()=>{
                                    Alert.alert('Saved Successfully but zone not changed')
                                 this.props.navigation.navigate('Dashboard')
                                })
                            }
                            
                        }

                    }
                    else {
                        const path3 = 'Users/ListOfUsers/' + id +'/'+existingUserData.group+ '/ListOfMembers/' + memid
                                firebaseApp.database().ref(path3).remove().then(()=>{
                                    Alert.alert('Saved Successfully')
                                    this.props.navigation.navigate('Dashboard')
                                }).catch(()=>{
                                    Alert.alert('Saved Successfully but zone not changed')
                                 this.props.navigation.navigate('Dashboard')
                                })
                    }



                }).catch((error) => {

                    Alert.alert('Failed')
                    console.log('Failed', error.message)
                })



        } else {
            Alert.alert('Invalid details')

        }

    }
    onRemovePress = () => {


        const memid = this.state.id


        const id = firebaseApp.auth().currentUser.uid
        const path = 'Users/ListOfUsers/' + id + '/ListOfMembers/' + memid + '/MemDetails'
        firebaseApp.database().ref(path).remove()
            .then((res) => {
                Alert.alert(this.state.name, 'Removed Successfully')
                this.props.navigation.navigate('Dashboard')
            }).catch((error) => {
                Alert.alert('error in removal', error.message)

            })

    }
    /* onRemovePress2 = async() => {
 
 
         const memid = this.state.id
 
 
         const id = firebaseApp.auth().currentUser.uid
         const path = 'Users/ListOfUsers/' + id + '/ListOfMembers/' + memid + '/MemDetails'
         try{
         const result = await firebaseApp.database().ref(path).remove()
         Alert.alert(this.state.name, 'Removed Successfully')
         this.props.navigation.navigate('Dashboard')
         }
         catch(e){
             Alert.alert('error in removal', error.message)
         }
 
 
     }*/
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
            <ScrollView>
                <View style={{ width: '100%', height: this.ConvertFlexToFixed(1.2) }}>
                    <View style={styles.headcontainer}>
                        <TouchableOpacity style={{ flex: 0.15, justifyContent: 'center', alignItems: 'center' }} onPress={() => { this.props.navigation.goBack() }}>
                            <View style={{ width: 30, height: 30 }}>
                                <Image source={require('../images/back.png')} style={{ flex: 1, width: undefined, height: undefined }} resizeMode={'contain'}>

                                </Image>

                            </View>



                        </TouchableOpacity>
                        <View style={{ flex: 0.70, justifyContent: 'center', marginLeft: 5 }}>
                            <Text style={{ fontSize: 20, color: 'black' }}>
                                Add New Member
                    </Text>
                        </View>



                    </View>
                    <View style={styles.ips}>
                        <View style={styles.internalips}>
                            <View style={{ flex: 0.13 }}>

                                <this.input name={'Name'} place={'Enter Name here'} value={this.state.name} ontext={(text) => { this.setState({ name: text }) }} />
                            </View>

                            <View style={{ flex: 0.13 }}>
                                <this.input name={'Job Title'} place={'Enter Job Title here'} value={this.state.job} ontext={(text) => { this.setState({ job: text }) }} />
                            </View>
                            <View style={{ flex: 0.13 }}>

                                <this.input name={'Company Name'} place={'Enter Company Name here'} value={this.state.cname} ontext={(text) => { this.setState({ cname: text }) }} />
                            </View>
                            <View style={{ flex: 0.13 }}>


                                <this.input name={'Contact Number'} place={'Enter Contact Number here'} value={this.state.number} ontext={(text) => { this.setState({ number: text }) }} />
                            </View>
                            <View style={{ flex: 0.09, justifyContent: 'flex-start' }}>
                                <Picker style={{ borderColor: '#E8EBF0', borderWidth: 2, borderRadius: 5 }} selectedValue={this.state.group}
                                    onValueChange={(text, itemIndex) => { this.setState({ group: text }) }}>
                                    <Picker.Item label="Business Zone" value="Business Zone" />
                                    <Picker.Item label="Friend Zone" value="Friend Zone" />
                                </Picker>
                            </View>
                            <View style={{ flex: 0.12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <DatePicker mode="date"
                                    style={{ width: '100%', backgroundColor: 'white', color: 'black', fontSize: 25 }}
                                    placeholder="select date"
                                    format="YYYY-MM-DD"
                                    minDate="1980-05-01"
                                    maxDate="2030-06-01"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    customStyles={{
                                        dateIcon: {
                                            position: 'absolute',
                                            right: 5,
                                            bottom: 4,
                                            marginLeft: 0
                                        },
                                        dateInput: {
                                            marginLeft: 0
                                        }
                                        // ... You can check the source to find the other keys.
                                    }} date={this.state.date} onDateChange={(date) => { this.setState({ date: date }) }}
                                />

                            </View>
                            <View style={styles.uploadimage}>
                                <View style={{ flex: 0.2 }}>
                                    <View style={{ width: 65, height: 50 }}>
                                        <Image source={{ uri: this.state.imageUrl }} style={{ flex: 1, width: undefined, height: undefined }} resizeMode={'cover'}>

                                        </Image>

                                    </View>
                                </View>
                                <View style={{ flex: 0.4, alignItems: 'center' }}>
                                    <Text style={{ fontSize: 20, color: 'black' }}>Upload</Text>

                                </View>
                                <View style={{ flex: 0.4 }}>
                                    <TouchableOpacity onPress={() => this.uploadImageFromDevice()} style={styles.choosefile}>
                                        <Text style={{ fontSize: 20, color: 'black' }}>Choose File</Text>
                                    </TouchableOpacity>
                                </View>


                            </View>
                            <View style={styles.saveremove}>




                                <View style={{ flex: 0.5 }}>
                                    <TouchableOpacity onPress={() => { this.onRemovePress() }} style={{ flex: 1, backgroundColor: '#9651b5', justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 20, marginRight: 10, borderRadius: 10 }}>
                                        <Text style={{ fontSize: 20, color: 'black' }}>Remove</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flex: 0.5 }}>
                                    <TouchableOpacity onPress={() => { this.onSavePress() }} style={{ flex: 1, backgroundColor: '#9651b5', justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 20, marginRight: 10, borderRadius: 10 }}>
                                        <Text style={{ fontSize: 20, color: 'black' }}>Save</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>



                        </View>

                    </View>



                </View>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white' },

    headcontainer: { flex: 0.08, backgroundColor: '#9746ab', flexDirection: 'row' },
    ips: { flex: 0.92 },
    internalips: { flex: 1, margin: 20 },

    saveremove: { flex: 0.14, flexDirection: 'row' },
    uploadimage: { flex: 0.13, alignItems: 'center', flexDirection: 'row' },
    choosefile: {
        flex: 1, backgroundColor: '#9651b5', borderRadius: 5, justifyContent: 'center',
        marginTop: 20, marginBottom: 20, alignItems: 'center', borderRadius: 5
    },
    datepicker: {
        flex: 1, backgroundColor: '#9651b5', borderRadius: 5, justifyContent: 'center',
        marginTop: 20, marginBottom: 20, alignItems: 'center', borderRadius: 5
    },


}

)